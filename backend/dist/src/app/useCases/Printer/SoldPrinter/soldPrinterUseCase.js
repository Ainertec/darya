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
exports.SoldPrinterUseCase = void 0;
/* eslint-disable array-callback-return */
var jsrtf_1 = __importDefault(require("jsrtf"));
var date_fns_1 = require("date-fns");
var printFile_1 = require("../../../utils/printFile");
var SoldPrinterUseCase = /** @class */ (function () {
    function SoldPrinterUseCase(soldReportUseCase) {
        this.soldReportUseCase = soldReportUseCase;
    }
    SoldPrinterUseCase.prototype.printer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, countOrders, dayOrdersByPayment, productsTotalAmount, totalOrders, totalProductsSold, myDoc, contentStyle, contentBorder, header, date, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.soldReportUseCase.execute()];
                    case 1:
                        _a = _b.sent(), countOrders = _a.countOrders, dayOrdersByPayment = _a.dayOrdersByPayment, productsTotalAmount = _a.productsTotalAmount, totalOrders = _a.totalOrders, totalProductsSold = _a.totalProductsSold;
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
                        date = date_fns_1.format(new Date(), 'dd/MM/yyyy HH:mm:ss');
                        myDoc.writeText('', contentBorder);
                        myDoc.writeText('>>>>> Relatório Geral <<<<<', header);
                        myDoc.writeText("Data: " + date, header);
                        myDoc.writeText("Pedidos Total: " + countOrders, header);
                        myDoc.writeText("---- Montante Produtos ----", header);
                        productsTotalAmount.map(function (product) {
                            myDoc.writeText("Produto: " + product._id.name + " Qtd: " + product.amount, contentStyle);
                        });
                        myDoc.writeText("", contentStyle);
                        myDoc.writeText("Total: " + totalProductsSold + " unid.", contentStyle);
                        myDoc.writeText("---- Montante Pagamento ---", header);
                        dayOrdersByPayment.map(function (order) {
                            myDoc.writeText(order._id + ": R$" + order.orders_total_price.toFixed(2), contentStyle);
                            myDoc.writeText("Quantidade: " + order.orders_total, contentStyle);
                        });
                        myDoc.writeText("", contentStyle);
                        myDoc.writeText("Total: R$" + totalOrders, contentStyle);
                        content = myDoc.createDocument();
                        try {
                            printFile_1.printFile(content, 'relatorio_geral');
                        }
                        catch (error) {
                            throw new Error(error);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SoldPrinterUseCase;
}());
exports.SoldPrinterUseCase = SoldPrinterUseCase;
