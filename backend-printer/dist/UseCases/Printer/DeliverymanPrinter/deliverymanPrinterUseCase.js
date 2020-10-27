"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverymanPrinterUseCase = void 0;
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
const jsrtf_1 = __importDefault(require("jsrtf"));
const date_fns_1 = require("date-fns");
const printFile_1 = require("../../../utils/printFile");
class DeliverymanPrinterUseCase {
    constructor(deliverymanUseCase) {
        this.deliverymanUseCase = deliverymanUseCase;
    }
    async printer(deliveryman_id) {
        const { deliverymanRate, deliverymanAddress, deliveryman, } = await this.deliverymanUseCase.execute(deliveryman_id);
        const myDoc = new jsrtf_1.default({
            language: jsrtf_1.default.Language.BR,
            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
            landscape: false,
            marginLeft: 5,
            marginRight: 2,
        });
        const contentStyle = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 20,
            fontSize: 8,
            paragraph: true,
        });
        const contentBorder = new jsrtf_1.default.Format({
            spaceBefore: 80,
            spaceAfter: 80,
            fontSize: 8,
            // paragraph: true,
            align: 'center',
            paragraph: true,
        });
        const header = new jsrtf_1.default.Format({
            spaceBefore: 20,
            spaceAfter: 100,
            fontSize: 8,
            bold: true,
            paragraph: true,
            align: 'center',
            borderTop: { size: 2, spacing: 100, color: jsrtf_1.default.Colors.GREEN },
        });
        const date = date_fns_1.format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        myDoc.writeText('', contentBorder);
        myDoc.writeText('>>> Relatório Motoboy <<<', header);
        myDoc.writeText(`Data: ${date}`, header);
        myDoc.writeText(``, contentStyle);
        myDoc.writeText(`Nome: ${deliveryman.name}`, contentStyle);
        myDoc.writeText(`Total Taxa: R$${deliverymanRate}`, contentStyle);
        myDoc.writeText(`--- Lista de Endereços ---`, header);
        deliverymanAddress.map(address => {
            myDoc.writeText(`Endereço: ${address.street},${address.district_name}`, contentStyle);
            myDoc.writeText(`Taxa: R$${address.district_rate.toFixed(2)}`, contentStyle);
        });
        const content = myDoc.createDocument();
        printFile_1.printFile(content, 'relatorio_motoboy');
    }
}
exports.DeliverymanPrinterUseCase = DeliverymanPrinterUseCase;
