import { CanActivate, ExecutionContext, forwardRef, Inject } from "@nestjs/common";
import { map, Observable, switchMap } from "rxjs";
import { BlogEntry } from "src/blog/model/blog-entry.interface";
import { BlogService } from "src/blog/service/blog.service";
import { User } from "src/user/models/user.interface";
import { UserService } from "src/user/service/user.service";

export class UserIsAuthorGuard implements CanActivate {
    constructor(
        private userService: UserService,
        @Inject(forwardRef(() => BlogService)) private blogService: BlogService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const params = request.params
        const blogEntryId: number = Number(params.id)
        const user: User = request.user

        return this.userService.findOne(user.id).pipe(
            switchMap((user: User) => {
                return this.blogService.findOne(blogEntryId).pipe(
                    map((blogEntry: BlogEntry) => {
                        let hasPermission = false

                        if (user.id === blogEntry.author.id) {
                            hasPermission = true
                        }

                        return user && hasPermission
                    })
                )
            })
        )
    }
}