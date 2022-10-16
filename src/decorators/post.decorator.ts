import { PostEntity } from './../post/entities/post.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Posts = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): PostEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.post.id;
  },
);
