import { Body, Controller, Get, Post } from '@nestjs/common';
import { Order } from '../../dto/Order';
import { OrderService } from './order.service';

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
