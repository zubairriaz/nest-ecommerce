import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Order } from '../../dto/Order';
import { OrderService } from './order.service';
import {AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getorders() {
    return this.orderService.getOrders();
  }

  @Post()
  saveOrder(@Body() order: Order) {
    return this.orderService.saveOrder(order);
  }
}
