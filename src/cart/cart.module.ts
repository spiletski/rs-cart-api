import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Carts, CartItems } from '../entities';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Carts, CartItems]), OrderModule ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
