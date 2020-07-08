import factory from 'factory-girl';
import faker from 'faker';

import Product from '../src/app/models/Product';
import Deliveryman from '../src/app/models/Deliveryman';
import District from '../src/app/models/District';

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

export default factory;
