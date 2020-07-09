import factory from 'factory-girl';
import faker, { fake } from 'faker';

import Product from '../src/app/models/Product';
import Deliveryman from '../src/app/models/Deliveryman';
import District from '../src/app/models/District';
import Client from '../src/app/models/Client';

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  cust: faker.commerce.price(),
  description: faker.commerce.productAdjective(),
});

factory.define('Deliveryman', Deliveryman, {
  name: faker.name.findName(),
  avaliable: faker.random.boolean(),
  working_day: faker.random.boolean(),
  phone: faker.phone.phoneNumber(),
});
factory.define('District', District, {
  name: faker.address.streetName(),
  city: faker.address.city(),
  rate: faker.random.number(100),
});
factory.define('Client', Client, {
  name: faker.name.findName(),
  address: [
    {
      district: factory.assoc('District', '_id'),
      street: faker.address.streetName(),
      reference: faker.address.streetAddress(),
      number: faker.random.number(1000),
    },
  ],
  phone: faker.phone.phoneNumber(),
});

export default factory;
