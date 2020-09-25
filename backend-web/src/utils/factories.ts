/* eslint-disable import/no-extraneous-dependencies */
import factory from 'factory-girl';
import faker from 'faker';

// import Product from '../src/app/models/Product';
// import Deliveryman from '../src/app/models/Deliveryman';
// import District from '../src/app/models/District';
import { Client } from '../Entity/Client';
import { District } from '../Entity/District';
import { Ingredient } from '../Entity/Ingredients';
import { Product } from '../Entity/Product';

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  cost: faker.commerce.price(),
  description: faker.commerce.productAdjective(),
  ingredients: [
    {
      material: factory.assoc('Ingredient', '_id'),
      quantity: faker.random.number(10),
    },
  ],
});
factory.define('Ingredient', Ingredient, {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  priceUnit: faker.commerce.price(),
  unit: 'g',
  stock: faker.random.number(100),
  description: faker.commerce.productAdjective(),
});

// factory.define('Deliveryman', Deliveryman, {
//   name: faker.name.findName(),
//   available: faker.random.boolean(),
//   working_day: faker.random.boolean(),
//   phone: faker.phone.phoneNumber(),
// });

factory.define('District', District, {
  name: faker.address.streetName(),
  city: faker.address.city(),
  rate: faker.random.number(100),
});

factory.define('Client', Client, {
  name: faker.name.findName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
  question: 'Qual o nome da sua mãe?',
  response: 'não sei',
  address: [
    {
      district: factory.assoc('District', '_id'),
      street: faker.address.streetName(),
      reference: faker.address.streetAddress(),
      number: faker.random.number(1000),
    },
  ],
  phone: [faker.phone.phoneNumber()],
});

// factory.define('Order', Order, {
//   client: {
//     client_id: factory.assoc('Client', '_id'),
//     name: faker.name.findName(),
//     phone: faker.phone.phoneNumber(),
//   },
//   deliveryman: factory.assoc('Deliveryman', '_id'),
//   address: {
//     client_address_id: factory.assoc('Client', 'address._id'),
//     district_id: factory.assoc('District', '_id'),
//     district_name: faker.address.streetName(),
//     district_rate: faker.random.number(100),
//     street: faker.address.streetName(),
//     reference: faker.address.streetAddress(),
//     number: faker.random.number(1000),
//   },
//   items: [
//     {
//       product: factory.assoc('Product', '_id'),
//       quantity: faker.random.number(10),
//     },
//   ],
//   source: 'Instagram',
//   total: faker.random.number(500),
//   note: faker.random.words(3),
//   finished: faker.random.boolean(),
//   identification: crypto.randomBytes(4).toString('hex'),
// });

export default factory;
