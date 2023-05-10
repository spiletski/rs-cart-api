import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts, CartItems } from "../../entities";

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Carts) private readonly userCarts: Repository<Carts>,
  ) {}

  async findByUserId(userId: string): Promise<Carts> {
    return this.userCarts.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.user', 'user')
        .leftJoinAndSelect('cart.items', 'item')
        .select(['cart', 'user.id', 'user.name', 'user.email', 'item'])
        .where('cart.user_id = :userId', { userId })
        .getOne();

  }

  async createByUserId(userId: string): Promise<Carts> {
    const cart = new Carts({
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      status: 'OPEN',
    });

    return this.userCarts.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const cart = this.findByUserId(userId);

    if (cart) {
      return cart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, updateCartDto: Partial<Carts>) {
    return this.userCarts.createQueryBuilder()
        .update(Carts)
        .set(updateCartDto)
        .where("user_id = :userId", { userId })
        .execute()
  }

  async removeByUserId(userId: string) {
    return this.userCarts
        .createQueryBuilder()
        .delete()
        .from(Carts)
        .where('user_id = :userId', {userId})
        .execute();
  }
}
