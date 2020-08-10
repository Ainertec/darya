import { SoldReportUseCase } from './soldReportUseCase';
import { ProductAmountUseCase } from '../Report/productsAmountUseCase';
import Order from '../../models/Order';

export class SoldPrinterUseCase {
  constructor(private soldReportUseCase: SoldReportUseCase) {}

  async printer() {
    const productsAmount = new ProductAmountUseCase(Order);
    const soldPrintUseCase = new SoldReportUseCase(Order, productsAmount);
    const responseToPrinter = await soldPrintUseCase.printer();
  }
}
