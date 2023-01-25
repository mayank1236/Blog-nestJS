import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { forwardRef } from '@nestjs/common/utils';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest()
        const { user } = request.user

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {

                const hasRole = () => roles.indexOf(user.role) > -1

                return user && hasRole()
            })
        )

        return true
    }
}