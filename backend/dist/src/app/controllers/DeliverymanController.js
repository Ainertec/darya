"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deliveryman_1 = __importDefault(require("../models/Deliveryman"));
class DeliverymanController {
    async index(request, response) {
        const deliveryman = await Deliveryman_1.default.find({});
        return response.json(deliveryman);
    }
    async show(request, response) {
        const deliveryman = await Deliveryman_1.default.find({
            working_day: true,
            available: true,
        });
        return response.json(deliveryman);
    }
    async showByName(request, response) {
        const { name } = request.params;
        const deliveryman = await Deliveryman_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
        return response.json(deliveryman);
    }
    async showByWorking(request, response) {
        const deliveryman = await Deliveryman_1.default.find({ working_day: true });
        return response.json(deliveryman);
    }
    async showByDelivery(request, response) {
        const deliveryman = await Deliveryman_1.default.find({
            working_day: true,
            available: true,
            hasDelivery: true,
        });
        return response.json(deliveryman);
    }
    async store(request, response) {
        const { name, working_day, available, phone, hasDelivery } = request.body;
        const deliveryman = await Deliveryman_1.default.create({
            name,
            working_day,
            available,
            phone,
            hasDelivery,
        });
        return response.json(deliveryman);
    }
    async update(request, response) {
        const { name, working_day, available, phone, hasDelivery } = request.body;
        const { id } = request.params;
        const deliveryman = await Deliveryman_1.default.findOneAndUpdate({ _id: id }, {
            name,
            phone,
        }, {
            new: true,
        });
        if (!deliveryman)
            return response.status(400).json('deliveryman was not found');
        if (working_day !== undefined)
            deliveryman.working_day = working_day;
        if (available !== undefined)
            deliveryman.available = available;
        if (hasDelivery !== undefined)
            deliveryman.hasDelivery = hasDelivery;
        await deliveryman.save();
        return response.json(deliveryman);
    }
    async reset(request, response) {
        await Deliveryman_1.default.updateMany({}, { $set: { working_day: false, available: false, hasDelivery: false } });
        return response.status(200).send();
    }
    async delete(request, response) {
        const { id } = request.params;
        await Deliveryman_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new DeliverymanController();
