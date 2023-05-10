import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../../entities'
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
      @InjectRepository(Order) private readonly orders: Repository<Order>,
  ) {}

  async findById(orderId: string): Promise<Order> {
    return this.orders.findOne({
      where: {
        id: orderId,
      },
      relations: ['cart', 'user']
    });
  }
}