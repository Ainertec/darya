import { DeliverymanPaymentUseCase } from '../Report/deliverymanPaymentUseCase';

export class DeliverymanPrinterUseCase {
  constructor(private deliverymanUseCase: DeliverymanPaymentUseCase) {}

  async printer(deliveryman_id: string) {
    const deliverymanPayment = await this.deliverymanUseCase.execute(
      deliveryman_id,
    );
    return 'Ola deliveryman foi impresso!';
  }
}
