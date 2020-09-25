import { Router } from 'express';

// import { celebrate } from 'celebrate';
// import { ProductRoutes } from './Products.routes';
import { ClientsRoutes } from './Clients.routes';
import { DistrictsRoutes } from './Districts.routes';
import { ForgotPasswordRoutes } from './ForgotPassword.routes';
import { ProductRoutes } from './Product.routes';
import { SessionRoutes } from './Session.routes';
// import { IngredientsRoutes } from './Ingredients.routes';
// import { DeliverymansRoutes } from './Deliverymans.routes';
// import { DistrictsRoutes } from './Districts.routes';
// import { OrdersRoutes } from './Orders.routes';

// // validations
// import product from '../validations/productSchema';
// import ingredient from '../validations/ingredientSchema';
// import deliveryman from '../validations/deliverymanSchema';
// import report from '../validations/reportSchema';
// import printer from '../validations/printerSchema';
// import district from '../validations/districtSchema';
// import serial from '../validations/serialSchema';
// import {
//   order,
//   orderUpdate,
//   paramDeliveryman,
//   paramIdentification,
// } from '../validations/orderSchema';
// import { client, clientUpdate } from '../validations/clientSchema';
// import { paramName, paramId } from '../validations/commonSchema';
// import { ReportsRoutes } from './Reports.routes';
// import { PrintersRoutes } from './Printers.routes';
// import SerialController from '../app/controllers/SerialController';

const routes = Router();

// // products
// const productRouters = new ProductRoutes(routes);
// productRouters.getRoutes({ product, paramName, paramId });

// clients
const clientRoutes = new ClientsRoutes(routes);
clientRoutes.getRoutes();

// districts
const districtRoutes = new DistrictsRoutes(routes);
districtRoutes.getRoutes();

// ForgotPassword
const forgotPasswordRoutes = new ForgotPasswordRoutes(routes);
forgotPasswordRoutes.getRoutes();

// session
const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();

// session
const productRoutes = new ProductRoutes(routes);
productRoutes.getRoutes();

export default routes;
