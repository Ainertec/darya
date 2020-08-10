import { Request, Response } from 'express';
import { sub } from 'date-fns';
import Order from '../models/Order';

import { OrdersProfitUseCase } from '../useCases/Report/ordersProfitUseCase';
import { DeliverymanPaymentUseCase } from '../useCases/Report/deliverymanPaymentUseCase';
import { ProductDispenseAndGainUseCase } from '../useCases/Report/productDispenseAndGainUseCase';
import { ProductAmountUseCase } from '../useCases/Report/productsAmountUseCase';
import { FinishedOrdersUseCase } from '../useCases/Report/finishedOrdersUseCase';

class ReportController {
  async deliverymanPayment(request: Request, response: Response) {
    const deliverymanPaymentUseCase = new DeliverymanPaymentUseCase(Order);
    const payment = await deliverymanPaymentUseCase.execute(
      request.params.deliveryman_id,
    );

    return response.json(payment);
  }

  async allFinishedOrdersByDeliveryman(request: Request, response: Response) {
    const finishedOrdersInstance = new FinishedOrdersUseCase(Order);
    const finishedOrders = await finishedOrdersInstance.execute(
      request.params.deliveryman_id,
    );
    return response.json(finishedOrders);
  }

  async ordersProfit(request: Request, response: Response) {
    const orderProfitUseCase = new OrdersProfitUseCase(Order);

    const ordersProfitReturn = await orderProfitUseCase.execute();

    return response.json(ordersProfitReturn);
  }

  async productsDispenseAndGain(request: Request, response: Response) {
    const dispenseAndGain = new ProductDispenseAndGainUseCase(Order);
    const productDispenseAndGain = await dispenseAndGain.execute();

    return response.json(productDispenseAndGain);
  }

  async productsAmount(request: Request, response: Response) {
    const productAmountInstance = new ProductAmountUseCase(Order);
    const amount = await productAmountInstance.execute();
    return response.json(amount);
  }

  public async delete(req: Request, res: Response) {
    const date = sub(new Date(), { years: 2 });

    await Order.deleteMany({
      createdAt: { $lte: date },
      finished: true,
    });

    return res.status(200).send();
  }
}

export default new ReportController();
