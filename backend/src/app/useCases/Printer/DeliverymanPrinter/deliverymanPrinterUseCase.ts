import jsRTF from 'jsrtf';
import { format } from 'date-fns';

import { DeliverymanPaymentUseCase } from '../../Report/deliverymanPaymentUseCase';
import { printFile } from '../../../utils/printFile';

export class DeliverymanPrinterUseCase {
  constructor(private deliverymanUseCase: DeliverymanPaymentUseCase) {}

  async printer(deliveryman_id: string) {
    const {
      deliverymanRate,
      deliverymanAddress,
      deliveryman,
    } = await this.deliverymanUseCase.execute(deliveryman_id);

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
    myDoc.writeText('>>> Relatório Motoboy <<<', header);
    myDoc.writeText(`Data: ${date}`, header);
    myDoc.writeText(``, contentStyle);
    myDoc.writeText(`Nome: ${deliveryman.name}`, contentStyle);
    myDoc.writeText(`Total Taxa: R$${deliverymanRate}`, contentStyle);
    myDoc.writeText(`--- Lista de Endereços ---`, header);
    deliverymanAddress.map(address => {
      myDoc.writeText(
        `${address.street},${address.district_name}`,
        contentStyle,
      );
      myDoc.writeText(
        `Taxa: R$${address.district_rate.toFixed(2)}`,
        contentStyle,
      );
    });
    const content = myDoc.createDocument();

    printFile(content, 'relatorio_motoboy');
  }
}
