import { Client } from '../../Entity/Client';
import { Order } from '../../Entity/Order';
import { Product } from '../../Entity/Product';
import { MongoOrderRepository } from '../../Repositories/implementation/MongoOrderRepository';
import { OrderController } from './OrderController';
import { OrderUseCase } from './OrderUseCase';

const repository = new MongoOrderRepository(Order, Product, Client);

const orderUseCase = new OrderUseCase(repository);

const orderController = new OrderController(orderUseCase);

export { orderController, orderUseCase };
