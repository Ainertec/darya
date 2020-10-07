"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var jsrtf_1 = __importDefault(require("jsrtf"));
var date_fns_1 = require("date-fns");
var shelljs_1 = require("shelljs");
var Order_1 = __importDefault(require("../models/Order"));
var productsAmountUseCase_1 = require("../useCases/Report/productsAmountUseCase");
var soldReportUseCase_1 = require("../useCases/Printer/SoldPrinter/soldReportUseCase");
var deliverymanPaymentUseCase_1 = require("../useCases/Report/deliverymanPaymentUseCase");
var deliverymanPrinterUseCase_1 = require("../useCases/Printer/DeliverymanPrinter/deliverymanPrinterUseCase");
var soldPrinterUseCase_1 = require("../useCases/Printer/SoldPrinter/soldPrinterUseCase");
var PrinterController = /** @class */ (function () {
    function PrinterController() {
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
    PrinterController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, order, date, myDoc, contentStyle, contentBorder, header, content, buffer, dir, vbs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.body.id;
                        return [4 /*yield*/, Order_1.default.findOne({ _id: id })
                                .populate('items.product')
                                .populate('deliveryman')];
                    case 1:
                        order = (_a.sent());
                        if (!order)
                            return [2 /*return*/, response.status(400).json('Order does not exist')];
                        date = order.createdAt && date_fns_1.format(order.createdAt, 'dd/MM/yyyy HH:mm:ss');
                        myDoc = new jsrtf_1.default({
                            language: jsrtf_1.default.Language.BR,
                            pageWidth: jsrtf_1.default.Utils.mm2twips(58),
                            landscape: false,
                            marginLeft: 5,
                            marginRight: 2,
                        });
                        contentStyle = new jsrtf_1.default.Format({
                            spaceBefore: 20,
                            spaceAfter: 20,
                            fontSize: 8,
                            paragraph: true,
                        });
                        contentBorder = new jsrtf_1.default.Format({
                            spaceBefore: 80,
                            spaceAfter: 80,
                            fontSize: 8,
                            // paragraph: true,
                            align: 'center',
                            paragraph: true,
                        });
                        header = new jsrtf_1.default.Format({
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
                        myDoc.writeText("C\u00F3digo: " + order.identification, header);
                        myDoc.writeText("Data: " + date, contentStyle);
                        myDoc.writeText('=========== Cliente ============', contentBorder);
                        myDoc.writeText("Nome: " + order.user.name, contentStyle);
                        myDoc.writeText("Telefone: " + order.user.phone, contentStyle);
                        order.address &&
                            myDoc.writeText('========== Endereço ===========', contentBorder);
                        order.address &&
                            myDoc.writeText("Rua: " + order.address.street, contentStyle);
                        order.address &&
                            myDoc.writeText("N\u00FAmero: " + order.address.number, contentStyle);
                        order.address &&
                            myDoc.writeText("Bairro: " + order.address.district_name, contentStyle);
                        order.address &&
                            myDoc.writeText("Refer\u00EAncia: " + order.address.reference, contentStyle);
                        myDoc.writeText('=========== Itens ============', contentBorder);
                        order.items.map(function (item) {
                            myDoc.writeText("* " + item.product.name + " --- R$ " + item.product.price.toFixed(2), contentStyle);
                            myDoc.writeText("\nQtd.: " + item.quantity + "\n", contentStyle);
                        });
                        myDoc.writeText('========== Motoboy ===========', contentBorder);
                        order.deliveryman &&
                            myDoc.writeText("Nome: " + order.deliveryman.name, contentStyle);
                        order.deliveryman &&
                            myDoc.writeText("Telefone: " + order.deliveryman.phone, contentStyle);
                        order.address &&
                            myDoc.writeText("Taxa: R$" + order.address.district_rate.toFixed(2), contentStyle);
                        myDoc.writeText('========== Observação =========', contentBorder);
                        order.note && myDoc.writeText("- " + order.note, contentStyle);
                        myDoc.writeText('========= Valor total =========', contentBorder);
                        myDoc.writeText("Valor total: R$" + order.total.toFixed(2), contentStyle);
                        content = myDoc.createDocument();
                        buffer = Buffer.from(content, 'binary');
                        dir = process.env.NODE_ENV === 'test'
                            ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes')
                            : process.env.DIR_PRODUCTION;
                        return [4 /*yield*/, fs_1.default.writeFile(dir + "/" + id + ".rtf", buffer, { encoding: 'utf-8', flag: 'w' }, function (err) {
                                if (err)
                                    return response.status(400).json("" + err);
                            })];
                    case 2:
                        _a.sent();
                        vbs = process.env.NODE_ENV === 'test'
                            ? path_1.default.resolve(__dirname, '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
                            : process.env.DIR_INITIALIZE_PRINT;
                        if (vbs) {
                            setTimeout(function () {
                                shelljs_1.exec(vbs);
                            }, 1000);
                            return [2 /*return*/, response.status(200).json('success')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PrinterController.prototype.deliverymanPrint = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var deliveryman_id, deliverymanPayment, deliverymanPrinter, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deliveryman_id = request.params.deliveryman_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        deliverymanPayment = new deliverymanPaymentUseCase_1.DeliverymanPaymentUseCase(Order_1.default);
                        deliverymanPrinter = new deliverymanPrinterUseCase_1.DeliverymanPrinterUseCase(deliverymanPayment);
                        return [4 /*yield*/, deliverymanPrinter.printer(deliveryman_id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                    case 3:
                        error_1 = _a.sent();
                        response.status(400).json('Erro on try print deliveryman payment');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PrinterController.prototype.soldPrint = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var productsAmount, soldReportUseCase, soldPrintUseCase, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productsAmount = new productsAmountUseCase_1.ProductAmountUseCase(Order_1.default);
                        soldReportUseCase = new soldReportUseCase_1.SoldReportUseCase(Order_1.default, productsAmount);
                        soldPrintUseCase = new soldPrinterUseCase_1.SoldPrinterUseCase(soldReportUseCase);
                        return [4 /*yield*/, soldPrintUseCase.printer()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.status(400).json('Failed on print general report')];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PrinterController;
}());
exports.default = new PrinterController();
