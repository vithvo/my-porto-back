// import axios from 'axios';
import {
  CreateUserDto,
  GitHubUserCodeDTO,
} from './../user/dto/create-user.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { URLSearchParams } from 'url';

const GITHUB_CLIENT_ID = 'dc0469dddba13d797736';
const GITHUB_CLIENT_SECRET = '7880f7ae8941d1a40af2600108e92f259b42c47f';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({
      email,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  genrateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;

    return {
      ...userData,
      token: this.genrateJwtToken(userData),
    };
  }

  async registr(dto: CreateUserDto) {
    try {
      const { password, ...userData } = await this.userService.create({
        email: dto.email,
        fullName: dto.fullName,
        password: dto.password,
      });
      return {
        ...userData,
        token: this.genrateJwtToken(userData),
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(
        'Error during registration, this email is already taken',
      );
    }
  }

  async registrGitHub(dto: GitHubUserCodeDTO) {
    const axios = require('axios');

    try {
      const githubToken = await axios
        .post(
          `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${dto.code}&redirect_uri=http://localhost:3333`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        .then((res) => res.data);

      const decoded = Object.fromEntries(new URLSearchParams(githubToken));

      const data = await axios
        .get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${decoded.access_token}` },
        })
        .then((res) => res.data)
        .catch((error) => {
          console.error(`Error getting user from GitHub`);
          throw error;
        });

      console.log(data);

      const { password, ...userData } = await this.userService.create({
        email: `${data.login}@github.com`,
        fullName: data.login,
        password: data.node_id,
      });
      return {
        ...userData,
        token: this.genrateJwtToken(userData),
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(
        'Error during registration, this GitHub email is already taken',
      );
    }
  }
  async loginGitHub(dto: GitHubUserCodeDTO) {
    const axios = require('axios');

    try {
      const githubToken = await axios
        .post(
          `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${dto.code}&redirect_uri=http://localhost:3333`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        )
        .then((res) => res.data);

      const decoded = Object.fromEntries(new URLSearchParams(githubToken));

      const data = await axios
        .get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${decoded.access_token}` },
        })
        .then((res) => res.data)
        .catch((error) => {
          console.error(`Error getting user from GitHub`);
          throw error;
        });

      console.log(data);

      const { password, ...userData } = await this.userService.findByCond({
        email: `${data.login}@github.com`,
        password: data.node_id,
      });
      return {
        ...userData,
        token: this.genrateJwtToken(userData),
      };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Error during login, no such GitHub email');
    }
  }
}
