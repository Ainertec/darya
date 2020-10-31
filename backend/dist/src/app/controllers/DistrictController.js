"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const District_1 = __importDefault(require("../models/District"));
class DistrictController {
    async index(request, response) {
        const districts = await District_1.default.find({});
        return response.json(districts);
    }
    async show(request, response) {
        const { name } = request.params;
        const districts = await District_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
        return response.json(districts);
    }
    async store(request, response) {
        const { name, city, rate } = request.body;
        const district = await District_1.default.create({
            name,
            city,
            rate,
        });
        return response.json(district);
    }
    async update(request, response) {
        const { name, city, rate } = request.body;
        const { id } = request.params;
        const district = await District_1.default.findOneAndUpdate({ _id: id }, {
            name,
            city,
            rate,
        }, { new: true });
        return response.json(district);
    }
    async delete(request, response) {
        const { id } = request.params;
        await District_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new DistrictController();
