import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { User } from '../../entities';

const RoleGuard = (role: number): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user: User = request.user;

      return user?.Role.id === role;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
