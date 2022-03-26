import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../dto/Order';
import { Order as OrderEntity } from '../../entities/Order';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>
  ) {}
  getOrders() {
    return this.orderRepo.find();
  }
  saveOrder(dto: Order) {
    dto.id = uuidv4()
    return this.orderRepo.save(dto);
  }
}
