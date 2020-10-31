"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopController = void 0;
const openShop_1 = require("../../services/openShop");
class ShopController {
    async store(request, response) {
        const { open } = request.body;
        openShop_1.Shop.setOpen(open);
        return response.status(200).send({});
    }
    async index(request, response) {
        const open = openShop_1.Shop.getOpen();
        return response.json({ open: open });
    }
}
exports.ShopController = ShopController;
