// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import {
  closeConnection,
  openConnection,
} from '../../../../__tests__/utils/connection';
import Order from '../../models/Order';
import factory from '../../../../__tests__/factories';

import { OrderInterface, DeliverymanInterface } from '../../../interfaces/base';
import { SoldReportUseCase } from './SoldPrinter/soldReportUseCase';
import { ProductAmountUseCase } from '../Report/productsAmountUseCase';

import app from '../../../app';
import Deliveryman from '../../models/Deliveryman';
import { IUserDocument } from '../../models/User';

describe('Teste a printer', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
    await Deliveryman.deleteMany({});
  });

  it('should return sold reports', async () => {
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Cartão',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Depósito itau',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Cartão',
      finished: true,
    });
    const productsAmount = new ProductAmountUseCase(Order);
    const soldPrintUseCase = new SoldReportUseCase(Order, productsAmount);
    const response = await soldPrintUseCase.execute();

    expect(response).toHaveProperty('countOrders');
  });

  it('should print a general report ', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Cartão',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Depósito itau',
      finished: true,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Cartão',
      finished: true,
    });
    const response = await request(app)
      .get('/printers/sold_report')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should print a deliveryman report ', async () => {
    const user = await factory.create<IUserDocument>('User', {
      admin: true,
    });
    const deliveryman = await factory.create<DeliverymanInterface>(
      'Deliveryman',
      {
        name: 'Celestino',
      },
    );
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
      deliveryman: deliveryman._id,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Cartão',
      finished: true,
      deliveryman: deliveryman._id,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
      deliveryman: deliveryman._id,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Dinheiro',
      finished: true,
      deliveryman: deliveryman._id,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Depósito itau',
      finished: true,
      deliveryman: deliveryman._id,
    });
    await factory.create<OrderInterface>('Order', {
      payment: 'Cartão',
      finished: true,
      deliveryman: deliveryman._id,
    });

    const response = await request(app)
      .get(`/printers/deliveryman_report/${deliveryman._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
  });
});
