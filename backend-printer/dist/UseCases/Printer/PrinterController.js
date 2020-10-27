"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsrtf_1 = __importDefault(require("jsrtf"));
const date_fns_1 = require("date-fns");
const shelljs_1 = require("shelljs");
const Order_1 = require("../../Entity/Order");
const productsAmountUseCase_1 = require("../Report/productsAmountUseCase");
const soldReportUseCase_1 = require("./SoldPrinter/soldReportUseCase");
const deliverymanPaymentUseCase_1 = require("../Report/deliverymanPaymentUseCase");
const deliverymanPrinterUseCase_1 = require("./DeliverymanPrinter/deliverymanPrinterUseCase");
const soldPrinterUseCase_1 = require("./SoldPrinter/soldPrinterUseCase");
class PrinterController {
    constructor() {
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
    async store(request, response) {
        const { id } = request.body;
        const order = (await Order_1.Order.findOne({ _id: id })
            .populate('items.product')
            .populate('deliveryman'));
        if (!order)
            return response.status(400).json('Order does not exist');
        const date = order.createdAt && date_fns_1.format(order.createdAt, 'dd/MM/yyyy HH:mm:ss');
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
            myDoc.writeText(`* ${item.product.name} --- R$ ${item.product.price.toFixed(2)}`, contentStyle);
            myDoc.writeText(`\nQtd.: ${item.quantity}\n`, contentStyle);
        });
        myDoc.writeText('========== Motoboy ===========', contentBorder);
        order.deliveryman &&
            myDoc.writeText(`Nome: ${order.deliveryman.name}`, contentStyle);
        order.deliveryman &&
            myDoc.writeText(`Telefone: ${order.deliveryman.phone}`, contentStyle);
        order.address &&
            myDoc.writeText(`Taxa: R$${order.address.district_rate.toFixed(2)}`, contentStyle);
        myDoc.writeText('========== Observação =========', contentBorder);
        order.note && myDoc.writeText(`- ${order.note}`, contentStyle);
        myDoc.writeText('========= Valor total =========', contentBorder);
        myDoc.writeText(`Valor total: R$${order.total.toFixed(2)}`, contentStyle);
        const content = myDoc.createDocument();
        const buffer = Buffer.from(content, 'binary');
        const dir = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, 'recipes')
            : process.env.DIR_PRODUCTION;
        await fs_1.default.writeFile(`${dir}/${id}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, err => {
            if (err)
                return response.status(400).json(`${err}`);
        });
        const vbs = process.env.NODE_ENV === 'test'
            ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
            : process.env.DIR_INITIALIZE_PRINT;
        if (vbs) {
            setTimeout(() => {
                shelljs_1.exec(vbs);
            }, 1000);
            return response.status(200).json('success');
        }
    }
    async deliverymanPrint(request, response) {
        const { deliveryman_id } = request.params;
        try {
            const deliverymanPayment = new deliverymanPaymentUseCase_1.DeliverymanPaymentUseCase(Order_1.Order);
            const deliverymanPrinter = new deliverymanPrinterUseCase_1.DeliverymanPrinterUseCase(deliverymanPayment);
            await deliverymanPrinter.printer(deliveryman_id);
            return response.status(200).send();
        }
        catch (error) {
            response.status(400).json('Erro on try print deliveryman payment');
        }
    }
    async soldPrint(request, response) {
        try {
            const productsAmount = new productsAmountUseCase_1.ProductAmountUseCase(Order_1.Order);
            const soldReportUseCase = new soldReportUseCase_1.SoldReportUseCase(Order_1.Order, productsAmount);
            const soldPrintUseCase = new soldPrinterUseCase_1.SoldPrinterUseCase(soldReportUseCase);
            await soldPrintUseCase.printer();
            return response.status(200).send();
        }
        catch (error) {
            return response.status(400).json('Failed on print general report');
        }
    }
}
exports.default = new PrinterController();
