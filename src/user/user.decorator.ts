import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDoc = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return data ? req.user[data] : req.user;
});
