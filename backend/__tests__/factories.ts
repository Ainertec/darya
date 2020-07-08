import factory from 'factory-girl';
import faker from 'faker';

import Product from '../src/app/models/Product';
import Deliveryman from '../src/app/models/Deliveryman';

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
});

export default factory;
