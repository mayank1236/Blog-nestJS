import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BlogModule } from 'src/blog/blog.module';
import { UserModule } from 'src/user/user.module';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guard';
import { UserIsAuthorGuard } from './guards/user-is-author.guard';
import { UserIsUserGuard } from './guards/UserIsUser.guard';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => BlogModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '10000s' }
            })
        }),
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy, UserIsUserGuard, UserIsAuthorGuard],
    exports: [AuthService]
})
export class AuthModule { }
