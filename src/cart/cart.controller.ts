import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { BasicAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(private cartService: CartService, private orderService: OrderService) {}

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req)
    const cart = await this.cartService.findByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req)
    const cart = await this.cartService.updateByUserId(userId, body)

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req)
    const cart = await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart }
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  /* @Post('checkout')
   checkout(@Req() req: AppRequest, @Body() body) {
     const userId = getUserIdFromRequest(req);
     const cart = this.cartService.findByUserId(userId);

     if (!(cart && cart.items.length)) {
       const statusCode = HttpStatus.BAD_REQUEST;
       req.statusCode = statusCode;

       return {
         statusCode,
         message: 'Cart is empty',
       };
     }

     const { id: cartId, items } = cart;
     const total = calculateCartTotal(cart);
     const order = this.orderService.create({
       ...body, // TODO: validate and pick only necessary data
       userId,
       cartId,
       items,
       total,
     });
     this.cartService.removeByUserId(userId);

     return {
       statusCode: HttpStatus.OK,
       message: 'OK',
       data: { cart },
     };
   }*/
}
