"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_girl_1 = __importDefault(require("factory-girl"));
var faker_1 = __importDefault(require("faker"));
var crypto_1 = __importDefault(require("crypto"));
var Product_1 = __importDefault(require("../src/app/models/Product"));
var Deliveryman_1 = __importDefault(require("../src/app/models/Deliveryman"));
var District_1 = __importDefault(require("../src/app/models/District"));
var User_1 = __importDefault(require("../src/app/models/User"));
var Ingredient_1 = __importDefault(require("../src/app/models/Ingredient"));
var Order_1 = __importDefault(require("../src/app/models/Order"));
factory_girl_1.default.define('Product', Product_1.default, {
    name: faker_1.default.commerce.productName(),
    price: faker_1.default.commerce.price(),
    cost: faker_1.default.commerce.price(),
    description: faker_1.default.commerce.productAdjective(),
    ingredients: [
        {
            material: factory_girl_1.default.assoc('Ingredient', '_id'),
            quantity: faker_1.default.random.number(10),
        },
    ],
});
factory_girl_1.default.define('Ingredient', Ingredient_1.default, {
    name: faker_1.default.commerce.productName(),
    price: faker_1.default.commerce.price(),
    priceUnit: faker_1.default.commerce.price(),
    unit: 'g',
    stock: faker_1.default.random.number(100),
    description: faker_1.default.commerce.productAdjective(),
});
factory_girl_1.default.define('Deliveryman', Deliveryman_1.default, {
    name: faker_1.default.name.findName(),
    available: faker_1.default.random.boolean(),
    working_day: faker_1.default.random.boolean(),
    phone: faker_1.default.phone.phoneNumber(),
});
factory_girl_1.default.define('District', District_1.default, {
    name: faker_1.default.address.streetName(),
    city: faker_1.default.address.city(),
    rate: faker_1.default.random.number(100),
});
factory_girl_1.default.define('User', User_1.default, {
    name: faker_1.default.name.findName(),
    username: faker_1.default.internet.userName(),
    password: faker_1.default.internet.password(),
    question: 'Qual o nome da sua mãe?',
    response: 'não sei',
    admin: faker_1.default.random.boolean(),
    address: [
        {
            district: factory_girl_1.default.assoc('District', '_id'),
            street: faker_1.default.address.streetName(),
            reference: faker_1.default.address.streetAddress(),
            number: faker_1.default.random.number(1000),
        },
    ],
    phone: [faker_1.default.phone.phoneNumber()],
});
factory_girl_1.default.define('Order', Order_1.default, {
    user: {
        user_id: factory_girl_1.default.assoc('User', '_id'),
        name: faker_1.default.name.findName(),
        phone: faker_1.default.phone.phoneNumber(),
    },
    deliveryman: factory_girl_1.default.assoc('Deliveryman', '_id'),
    address: {
        user_address_id: factory_girl_1.default.assoc('User', 'address._id'),
        district_id: factory_girl_1.default.assoc('District', '_id'),
        district_name: faker_1.default.address.streetName(),
        district_rate: faker_1.default.random.number(100),
        street: faker_1.default.address.streetName(),
        reference: faker_1.default.address.streetAddress(),
        number: faker_1.default.random.number(1000),
    },
    items: [
        {
            product: factory_girl_1.default.assoc('Product', '_id'),
            quantity: faker_1.default.random.number(10),
        },
    ],
    source: 'Instagram',
    total: faker_1.default.random.number(500),
    note: faker_1.default.random.words(3),
    finished: faker_1.default.random.boolean(),
    identification: crypto_1.default.randomBytes(4).toString('hex'),
});
exports.default = factory_girl_1.default;
