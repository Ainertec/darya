"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const getProductCost_1 = __importDefault(require("../utils/getProductCost"));
class ProductController {
    constructor() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    async index(request, response) {
        const products = await Product_1.default.find({}).populate('ingredients.material');
        return response.json(products);
    }
    async show(request, response) {
        const { name } = request.params;
        const products = await Product_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        }).populate('ingredients.material');
        return response.json(products);
    }
    async store(request, response) {
        const { name, price, description, ingredients, available, image } = request.body;
        const cost = await getProductCost_1.default(ingredients);
        const product = await Product_1.default.create({
            name,
            price,
            cost,
            description,
            ingredients,
            available,
            image,
        });
        await product.populate('ingredients.material').execPopulate();
        return response.json(product);
    }
    async update(request, response) {
        const { name, price, ingredients, description, available, image } = request.body;
        const { id } = request.params;
        const cost = await getProductCost_1.default(ingredients);
        const product = await Product_1.default.findOneAndUpdate({ _id: id }, {
            name,
            price,
            description,
            ingredients,
            cost,
            available,
            image,
        }, { new: true });
        if (!product)
            return response.status(400).json('product not found');
        await product.save();
        await product.populate('ingredients.material').execPopulate();
        return response.json(product);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Product_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new ProductController();
