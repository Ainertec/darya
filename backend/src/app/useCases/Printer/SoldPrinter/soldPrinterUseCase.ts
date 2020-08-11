import jsRTF from 'jsrtf';

import { SoldReportUseCase } from './soldReportUseCase';
import { IOrdersByPayment, IProductAmount } from './printerUseCaseDTO';
import { printFile } from '../../../utils/printFile';
import { format } from 'date-fns';

export class SoldPrinterUseCase {
  constructor(private soldReportUseCase: SoldReportUseCase) {}

  async printer() {
    const {
      countOrders, // quantidade total de pedidos
      dayOrdersByPayment, // listagem pedidos por pagamento
      productsTotalAmount, // listagem produtos por id
      totalOrders, // total de pedidos em dinheiro
      totalProductsSold, // total de produtos vendidos
    } = await this.soldReportUseCase.execute();

    const myDoc = new jsRTF({
      language: jsRTF.Language.BR,
      pageWidth: jsRTF.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      paragraph: true,
    });
    const contentBorder = new jsRTF.Format({
      spaceBefore: 80,
      spaceAfter: 80,
      fontSize: 8,
      // paragraph: true,
      align: 'center',
      paragraph: true,
      // borderBottom: { type: 'single', width: 10 },
    });
    const header = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: jsRTF.Colors.GREEN },
    });
    const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
    myDoc.writeText('', contentBorder);
    myDoc.writeText('>>>>> Relatório Geral <<<<<', header);
    myDoc.writeText(`Data: ${date}`, header);
    myDoc.writeText(`Pedidos Total: ${countOrders}`, header);
    myDoc.writeText(`---- Montante Produtos ----`, header);
    productsTotalAmount.map((product: IProductAmount) => {
      myDoc.writeText(`${product._id.name} ${product.amount}`, contentStyle);
    });
    myDoc.writeText(``, contentStyle);
    myDoc.writeText(`Total: ${totalProductsSold}`, contentStyle);
    myDoc.writeText(`---- Montante Pagamento ---`, header);
    dayOrdersByPayment.map((order: IOrdersByPayment) => {
      myDoc.writeText(
        `${order._id}: R$${order.orders_total_price.toFixed(2)}`,
        contentStyle,
      );
      myDoc.writeText(`Quantidade: ${order.orders_total}`, contentStyle);
    });
    myDoc.writeText(``, contentStyle);
    myDoc.writeText(`Total: R$${totalOrders}`, contentStyle);

    const content = myDoc.createDocument();
    try {
      printFile(content, 'relatorio_geral');
    } catch (error) {
      throw new Error(error);
    }
  }
}
