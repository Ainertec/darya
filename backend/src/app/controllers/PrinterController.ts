/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import JsRTF from 'jsrtf';

import { format } from 'date-fns';
import { exec } from 'shelljs';
import Order from '../models/Order';

import { ProductAmountUseCase } from '../useCases/Report/productsAmountUseCase';
import { SoldReportUseCase } from '../useCases/Printer/SoldPrinter/soldReportUseCase';

import { OrderInterfaceDeliveryman } from '../../interfaces/base';
import { DeliverymanPaymentUseCase } from '../useCases/Report/deliverymanPaymentUseCase';
import { DeliverymanPrinterUseCase } from '../useCases/Printer/DeliverymanPrinter/deliverymanPrinterUseCase';
import { SoldPrinterUseCase } from '../useCases/Printer/SoldPrinter/soldPrinterUseCase';

class PrinterController {
  public constructor() {
    this.store = this.store.bind(this);
  }

  // private printProducts(items: ItemsInterface[]) {
  //   let products = '';
  //   items.map(item => {
  //     products += `* ${item.product.name} --- R$${item.product.price.toFixed(
  //       2,
  //     )}\nQtd.: ${item.quantity}\n`;
  //   });

  //   return products;
  // }

  async store(request: Request, response: Response) {
    const { id } = request.body;

    const order = ((await Order.findOne({ _id: id })
      .populate('items.product')
      .populate('deliveryman')) as unknown) as OrderInterfaceDeliveryman;
    if (!order) return response.status(400).json('Order does not exist');

    const date =
      order.createdAt && format(order.createdAt, 'dd/MM/yyyy HH:mm:ss');

    const myDoc = new JsRTF({
      language: JsRTF.Language.BR,
      pageWidth: JsRTF.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new JsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      paragraph: true,
    });
    const contentBorder = new JsRTF.Format({
      spaceBefore: 80,
      spaceAfter: 80,
      fontSize: 8,
      // paragraph: true,
      align: 'center',
      paragraph: true,
      // borderBottom: { type: 'single', width: 10 },
    });
    const header = new JsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: JsRTF.Colors.GREEN },
    });

    // const items = this.printProducts(order.items);

    myDoc.writeText('', contentBorder);
    myDoc.writeText('>>>>>>>>> Pedido <<<<<<<<<<', header);
    myDoc.writeText(`Código: ${order.identification}`, header);
    myDoc.writeText(`Data: ${date}`, contentStyle);
    myDoc.writeText('=========== Cliente ============', contentBorder);
    myDoc.writeText(`Nome: ${order.user.name}`, contentStyle);
    myDoc.writeText(`Telefone: ${order.user.phone}`, contentStyle);
    order.address &&
      myDoc.writeText('========== Endereço ===========', contentBorder);
    order.address &&
      myDoc.writeText(`Rua: ${order.address.street}`, contentStyle);
    order.address &&
      myDoc.writeText(`Número: ${order.address.number}`, contentStyle);
    order.address &&
      myDoc.writeText(`Bairro: ${order.address.district_name}`, contentStyle);
    order.address &&
      myDoc.writeText(`Referência: ${order.address.reference}`, contentStyle);
    myDoc.writeText('=========== Itens ============', contentBorder);
    order.items.map(item => {
      myDoc.writeText(
        `* ${item.product.name} --- R$ ${item.product.price.toFixed(2)}`,
        contentStyle,
      );
      myDoc.writeText(`\nQtd.: ${item.quantity}\n`, contentStyle);
    });

    myDoc.writeText('========== Motoboy ===========', contentBorder);
    order.deliveryman &&
      myDoc.writeText(`Nome: ${order.deliveryman.name}`, contentStyle);
    order.deliveryman &&
      myDoc.writeText(`Telefone: ${order.deliveryman.phone}`, contentStyle);
    order.address &&
      myDoc.writeText(
        `Taxa: R$${order.address.district_rate.toFixed(2)}`,
        contentStyle,
      );
    myDoc.writeText('========== Observação =========', contentBorder);
    order.note && myDoc.writeText(`- ${order.note}`, contentStyle);
    myDoc.writeText('========= Valor total =========', contentBorder);
    myDoc.writeText(`Valor total: R$${order.total.toFixed(2)}`, contentStyle);

    const content = myDoc.createDocument();

    const buffer = Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;
    await fs.writeFile(
      `${dir}/${id}.rtf`,
      buffer,
      { encoding: 'utf-8', flag: 'w' },
      err => {
        if (err) return response.status(400).json(`${err}`);
      },
    );

    const vbs =
      process.env.NODE_ENV === 'test'
        ? path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '__tests__',
            'recipes',
            'impressao.vbs',
          )
        : process.env.DIR_INITIALIZE_PRINT;

    if (vbs) {
      setTimeout(() => {
        exec(vbs);
      }, 1000);
      return response.status(200).json('success');
    }
  }

  async deliverymanPrint(request: Request, response: Response) {
    const { deliveryman_id } = request.params;

    try {
      const deliverymanPayment = new DeliverymanPaymentUseCase(Order);
      const deliverymanPrinter = new DeliverymanPrinterUseCase(
        deliverymanPayment,
      );
      await deliverymanPrinter.printer(deliveryman_id);
      return response.status(200).send();
    } catch (error) {
      response.status(400).json('Erro on try print deliveryman payment');
    }
  }

  async soldPrint(request: Request, response: Response) {
    try {
      const productsAmount = new ProductAmountUseCase(Order);
      const soldReportUseCase = new SoldReportUseCase(Order, productsAmount);
      const soldPrintUseCase = new SoldPrinterUseCase(soldReportUseCase);
      await soldPrintUseCase.printer();
      return response.status(200).send();
    } catch (error) {
      return response.status(400).json('Failed on print general report');
    }
  }
}
export default new PrinterController();
