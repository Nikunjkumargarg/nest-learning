import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//remember to import crypto packages when using typeormmodule.forrootasync.
import * as crypto from 'crypto';
import { Users } from './users/users.entity';
import { Posts } from './posts/posts.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
(global as any).crypto = crypto;

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [Users, Posts],
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'Nikunj@gauri32',
        host: 'localhost',
        database: 'nestjs-db',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: '[.env.development]',
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
