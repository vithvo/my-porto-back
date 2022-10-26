import { CreateUserDto, GitHubUserCodeDTO } from './../user/dto/create-user.dto';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Post('registr')
  registr(@Body() dto: CreateUserDto) {
    return this.authService.registr(dto);
  }
  @Post('registrGitHub')
  registrGitHub(@Body() dto: GitHubUserCodeDTO) {
    return this.authService.registrGitHub(dto);
  }
  @Post('loginGitHub')
  loginGitHub(@Body() dto: GitHubUserCodeDTO) {
    return this.authService.loginGitHub(dto);
  }
}
