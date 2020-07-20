import express from 'express';
import { celebrate } from 'celebrate';

import ProductController from './app/controllers/ProductController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DistrictController from './app/controllers/DistrictController';
import ClientController from './app/controllers/ClientController';
import OrderController from './app/controllers/OrderController';
import ReportController from './app/controllers/ReportController';
import PrinterController from './app/controllers/PrinterController';
import SerialController from './app/controllers/SerialController';

// validations
import product from './validations/productSchema';
import deliveryman from './validations/deliverymanSchema';
import district from './validations/districtSchema';
import client from './validations/clientSchema';
import report from './validations/reportSchema';
import serial from './validations/serialSchema';
import printer from './validations/printerSchema';
import {
  order,
  orderUpdate,
  paramDeliveryman,
  paramIdentification,
} from './validations/orderSchema';
import { paramName, paramId } from './validations/commonSchema';

const routes = express.Router();
// Products
routes.get('/products', ProductController.index);
routes.get('/products/:name', celebrate({ params: paramName }), ProductController.show);
routes.post('/products', celebrate({ body: product }), ProductController.store);
routes.put(
  '/products/:id',
  celebrate({ body: product, params: paramId }),
  ProductController.update
);
routes.delete('/products/:id', celebrate({ params: paramId }), ProductController.delete);

// Deliverymans
routes.get('/deliverymans', DeliverymanController.index);
routes.get('/deliverymans/hasDelivery', DeliverymanController.showByDelivery);
routes.get('/deliverymans/availables', DeliverymanController.show);
routes.get('/deliverymans/working_days', DeliverymanController.showByWorking);
routes.get('/deliverymans/:name', DeliverymanController.showByName);
routes.post('/deliverymans', celebrate({ body: deliveryman }), DeliverymanController.store);
routes.put(
  '/deliverymans/:id',
  celebrate({ body: deliveryman, params: paramId }),
  DeliverymanController.update
);
routes.put('/deliverymans', DeliverymanController.reset);
routes.delete('/deliverymans/:id', celebrate({ params: paramId }), DeliverymanController.delete);

// District

routes.get('/districts', DistrictController.index);
routes.get('/districts/:name', celebrate({ params: paramName }), DistrictController.show);
routes.post('/districts', celebrate({ body: district }), DistrictController.store);
routes.put(
  '/districts/:id',
  celebrate({ body: district, params: paramId }),
  DistrictController.update
);
routes.delete('/districts/:id', celebrate({ params: paramId }), DistrictController.delete);

// Client
routes.get('/clients', ClientController.index);
routes.get('/clients/:name', celebrate({ params: paramName }), ClientController.show);
routes.post('/clients', celebrate({ body: client }), ClientController.store);
routes.put('/clients/:id', celebrate({ body: client, params: paramId }), ClientController.update);
routes.delete('/clients/:id', celebrate({ params: paramId }), ClientController.delete);

// Order
routes.get('/orders', OrderController.index);
routes.get(
  '/orders/deliveryman/:deliveryman',
  celebrate({ params: paramDeliveryman }),
  OrderController.showByDeliveryman
);
routes.get(
  '/orders/:identification',
  celebrate({ params: paramIdentification }),
  OrderController.show
);
routes.post('/orders', celebrate({ body: order }), OrderController.store);
routes.put('/orders/:id', celebrate({ body: orderUpdate }), OrderController.update);
routes.delete('/orders/:id', celebrate({ params: paramId }), OrderController.delete);

// Reports

routes.get(
  '/reports/deliveryman/rate/:deliveryman_id',
  celebrate({ params: report }),
  ReportController.deliverymanPayment
);
routes.get('/reports/orders/profit', ReportController.ordersProfit);
routes.get('/reports/products/dispense_gain', ReportController.productsDispenseAndGain);
routes.get('/reports/products/amount', ReportController.productsAmount);
routes.delete('/reports', ReportController.delete);

// Printer
routes.post('/printers', celebrate({ body: printer }), PrinterController.store);

// Serial
routes.get('/serial_false', celebrate({ query: serial }), SerialController.exit);
export default routes;
