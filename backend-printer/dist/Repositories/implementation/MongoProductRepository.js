"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoProductRepository = void 0;
class MongoProductRepository {
    constructor(model) {
        this.model = model;
    }
    async byName(name) {
        const products = await this.model.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
        return products;
    }
    async all() {
        const products = await this.model.find({});
        return products;
    }
}
exports.MongoProductRepository = MongoProductRepository;
