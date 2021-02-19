"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldPrinterUseCase = void 0;
/* eslint-disable array-callback-return */
const jsrtf_1 = __importDefault(require("jsrtf"));
const date_fns_1 = require("date-fns");
const printFile_1 = require("../../../utils/printFile");
class SoldPrinterUseCase {
    constructor(soldReportUseCase) {
        this.soldReportUseCase = soldReportUseCase;
    }
    async printer() {
        const { countOrders, // quantidade total de pedidos
        dayOrdersByPayment, // listagem pedidos por pagamento
        productsTotalAmount, // listagem produtos por id
        totalOrders, // total de pedidos em dinheiro
        totalProductsSold, } = await this.soldReportUseCase.execute();
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
        myDoc.writeText('>>>>> Relatório Geral <<<<<', header);
        myDoc.writeText(`Data: ${date}`, header);
        myDoc.writeText(`Pedidos Total: ${countOrders}`, header);
        myDoc.writeText(`---- Montante Produtos ----`, header);
        productsTotalAmount.map((product) => {
            myDoc.writeText(`Produto: ${product._id.name} Qtd: ${product.amount}`, contentStyle);
        });
        myDoc.writeText(``, contentStyle);
        myDoc.writeText(`Total: ${totalProductsSold} unid.`, contentStyle);
        myDoc.writeText(`---- Montante Pagamento ---`, header);
        dayOrdersByPayment.map((order) => {
            myDoc.writeText(`${order._id}: R$${order.orders_total_price.toFixed(2)}`, contentStyle);
            myDoc.writeText(`Quantidade: ${order.orders_total}`, contentStyle);
        });
        myDoc.writeText(``, contentStyle);
        myDoc.writeText(`Total: R$${totalOrders}`, contentStyle);
        const content = myDoc.createDocument();
        try {
            printFile_1.printFile(content, 'relatorio_geral');
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.SoldPrinterUseCase = SoldPrinterUseCase;
