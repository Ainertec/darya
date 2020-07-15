import { Request, Response } from 'express';
import Order from '../models/Order';
import path from 'path';
import fs from 'fs';
import jsRTF from 'jsrtf';
import { format } from 'date-fns';
import { exec } from 'shelljs';

import { ItemsInterface, OrderInterfaceDeliveryman } from '../../interfaces/base';

class PrinterController {
  public constructor() {
    this.store = this.store.bind(this);
  }

  private printProducts(items: ItemsInterface[]) {
    let products = '';
    items.map((item) => {
      products += `* ${item.product.name} Qtd.: ${item.quantity}`;
    });

    return products;
  }

  async store(request: Request, response: Response) {
    const { id } = request.body;

    const order = ((await Order.findOne({ _id: id })
      .populate('items.product')
      .populate('deliveryman')) as unknown) as OrderInterfaceDeliveryman;
    if (!order) return response.status(400).json('Order does not exist');

    const date = order.createdAt && format(order.createdAt, 'dd/MM/yyyy HH:mm:ss');

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

    const items = this.printProducts(order.items);

    myDoc.writeText('', contentBorder);
    myDoc.writeText('>>>>>>>>> Pedido <<<<<<<<<<', header);
    myDoc.writeText(`Código: ${order.identification}`, header);
    myDoc.writeText(`Data: ${date}`, contentStyle);
    myDoc.writeText('=========== Cliente ============', contentBorder);
    myDoc.writeText(`Nome: ${order.client.name}`, contentStyle);
    myDoc.writeText(`Telefone: ${order.client.phone}`, contentStyle);
    myDoc.writeText('========== Endereço ===========', contentBorder);
    myDoc.writeText(`Rua: ${order.address.street}`, contentStyle);
    myDoc.writeText(`Número: ${order.address.number}`, contentStyle);
    myDoc.writeText(`Bairro: ${order.address.district_name}`, contentStyle);
    myDoc.writeText(`Referência: ${order.address.reference}`, contentStyle);
    myDoc.writeText('=========== Itens ============', contentBorder);
    myDoc.writeText(`${items}`, contentStyle);
    myDoc.writeText('========== Motoboy ===========', contentBorder);
    myDoc.writeText(`Nome: ${order.deliveryman.name}`, contentStyle);
    myDoc.writeText(`Telefone: ${order.deliveryman.phone}`, contentStyle);
    myDoc.writeText(`Taxa: ${order.address.district_rate}`, contentStyle);
    myDoc.writeText('========== Observação =========', contentBorder);
    myDoc.writeText(`- ${order.note}`, contentStyle);

    const content = myDoc.createDocument();

    const buffer = Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;
    console.log('dir production', process.env.DIR_PRODUCTION);
    await fs.writeFile(`${dir}/${id}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, (err) => {
      if (err) return response.status(400).json(`${err}`);
    });

    // const vbs =
    //   process.env.NODE_ENV === 'test'
    //     ? path.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
    //     : process.env.DIR_INITIALIZE_PRINT;

    // setTimeout(() => {
    //   exec(vbs);
    // }, 1000);
    return response.status(200).json('success');
  }
}
export default new PrinterController();
