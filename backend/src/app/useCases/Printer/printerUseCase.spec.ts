import {
  closeConnection,
  openConnection,
} from '../../../../__tests__/utils/connection';
import Order from '../../models/Order';
import factory from '../../../../__tests__/factories';

import { OrderInterface } from '../../../interfaces/base';
import { SoldReportUseCase } from './soldReportUseCase';
import { ProductAmountUseCase } from '../Report/productsAmountUseCase';

describe('Teste a printer', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
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
    const response = await soldPrintUseCase.printer();

    console.log(response);

    expect(response).toHaveProperty('countOrders');
  });
});
