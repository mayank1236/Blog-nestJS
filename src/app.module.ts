import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/models/user.entity';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { BlogEntryEntity } from './blog/model/blog-entry.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'blog',
      entities: [UserEntity, BlogEntryEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
