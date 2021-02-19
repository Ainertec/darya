"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class UserController {
    constructor() {
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }
    async userNameValidation(name, phone) {
        const userWithSameName = await User_1.default.findOne({ name });
        if (!userWithSameName || !userWithSameName.phone)
            return;
        let hasSamePhone = false;
        phone.forEach((element) => {
            var _a;
            if ((_a = userWithSameName.phone) === null || _a === void 0 ? void 0 : _a.includes(element)) {
                hasSamePhone = true;
            }
        });
        if (hasSamePhone)
            return 'User has the same name and phone number';
    }
    async index(request, response) {
        const users = await User_1.default.find().populate('address.district');
        return response.json(users);
    }
    async show(request, response) {
        const { name } = request.params;
        const users = await User_1.default.find({
            $or: [
                {
                    phone: { $regex: new RegExp(name), $options: 'i' },
                },
                {
                    name: { $regex: new RegExp(name), $options: 'i' },
                },
            ],
        }).populate('address.district');
        return response.json(users);
    }
    async store(request, responseHttp) {
        const { name, address, phone, password, question, response, username, admin, } = request.body;
        const { userId } = request;
        const userAdm = await User_1.default.findOne({ _id: userId });
        const sameUsername = await User_1.default.findOne({ username });
        if (sameUsername) {
            return responseHttp.status(400).json('That username already exist');
        }
        if (phone) {
            const isInvalidName = await this.userNameValidation(name, phone);
            if (isInvalidName) {
                return responseHttp.status(400).json(isInvalidName);
            }
        }
        const user = await User_1.default.create({
            name,
            address: address || undefined,
            phone: phone || undefined,
            password,
            question,
            response,
            username,
            admin: !userId || !userAdm.admin ? false : admin,
        });
        await user.populate('address.district').execPopulate();
        return responseHttp.json(user);
    }
    async update(request, responseHttp) {
        const { name, address, phone, password, username, admin, question, response, } = request.body;
        const { id } = request.params;
        const { userId } = request;
        const authUser = await User_1.default.findOne({ _id: userId });
        const userToUpdate = await User_1.default.findOne({ _id: id });
        const user = authUser.admin ? userToUpdate : authUser;
        if (!user)
            return response.status(400).json('user does not exist');
        if (name && !phone && user.phone) {
            const isInvalidName = await this.userNameValidation(name, user.phone);
            if (isInvalidName) {
                return response.status(400).json(isInvalidName);
            }
            user.name = name;
        }
        if (name && phone) {
            const isInvalidName = await this.userNameValidation(name, phone);
            if (isInvalidName) {
                return responseHttp.status(400).json(isInvalidName);
            }
            user.name = name;
        }
        if (phone) {
            user.phone = phone;
        }
        if (address) {
            user.address = address;
        }
        if (password) {
            user.password = password;
        }
        if (question) {
            user.question = question;
        }
        if (response) {
            user.response = response;
        }
        if (admin && user.admin) {
            user.admin = admin;
        }
        if (username) {
            const alreadyExists = await User_1.default.findOne({ username });
            if (alreadyExists) {
                return response.status(400).json('This username already exist');
            }
            user.username = username;
        }
        await user.save();
        await user.populate('address.district').execPopulate();
        return responseHttp.json(user);
    }
    async delete(request, response) {
        const { id } = request.params;
        await User_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new UserController();
