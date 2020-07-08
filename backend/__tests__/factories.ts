import factory from 'factory-girl';
import faker from 'faker';

import Product from '../src/app/models/Product';

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  cust: faker.commerce.price(),
  description: faker.commerce.productAdjective(),
});

export default factory;
