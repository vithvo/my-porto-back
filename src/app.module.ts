import { AnswerModule } from './answers/answer.module';
import { AnswerEntity } from './answers/entities/answer.entity';
import { CommentEntity } from './comment/entities/comment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PostEntity } from './post/entities/post.entity';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Loveislive555',
      database: 'postgres',
      entities: [UserEntity, PostEntity, CommentEntity, AnswerEntity],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
    AnswerModule,
    AuthModule,
  ],
  //  controllers: [AppController],
})
export class AppModule {}
