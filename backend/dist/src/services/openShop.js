"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = void 0;
class Shop {
    static setOpen(open) {
        this.open = open;
    }
    static getOpen() {
        return this.open;
    }
}
exports.Shop = Shop;
Shop.open = false;
