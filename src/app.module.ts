import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import {UsersModule} from "./users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";

import { ConfigModule, ConfigService  } from '@nestjs/config';

import { Carts, CartItems, User, Order } from './entities';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get<number>('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_NAME'),
        entities: [Carts, CartItems, User, Order],
        synchronize: false, //true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule, CartModule, OrderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
