import { Router } from 'express';

import { celebrate } from 'celebrate';
import { ProductRoutes } from './Products.routes';
import { UserRoutes } from './Users.routes';
import { IngredientsRoutes } from './Ingredients.routes';
import { DeliverymansRoutes } from './Deliverymans.routes';
import { DistrictsRoutes } from './Districts.routes';
import { OrdersRoutes } from './Orders.routes';

// validations
import product from '../validations/productSchema';
import ingredient from '../validations/ingredientSchema';
import deliveryman from '../validations/deliverymanSchema';
import report from '../validations/reportSchema';
import printer from '../validations/printerSchema';
import district from '../validations/districtSchema';
import serial from '../validations/serialSchema';
import {
  order,
  orderUpdate,
  paramDeliveryman,
  paramIdentification,
} from '../validations/orderSchema';
import { client, clientUpdate } from '../validations/clientSchema';
import { paramName, paramId } from '../validations/commonSchema';
import { ReportsRoutes } from './Reports.routes';
import { PrintersRoutes } from './Printers.routes';
import SerialController from '../app/controllers/SerialController';
import { SessionRoutes } from './Session.routes';
import { ForgotPasswordRoutes } from './ForgotPassword.routes';
import Authentication from '../middlewares/Authentication';
import Authorization from '../middlewares/Authorization';

const routes = Router();

// session
const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();
// forgot
const forgotPassworndRoutes = new ForgotPasswordRoutes(routes);
forgotPassworndRoutes.getRoutes();

// users
const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes({ paramName, paramId, client, clientUpdate });

// products
const productRouters = new ProductRoutes(routes);
productRouters.getRoutes({ product, paramName, paramId });

// districtsRoutes
const districtRoutes = new DistrictsRoutes(routes);
districtRoutes.getRoutes({ paramName, paramId, district });

routes.use(Authentication);

// orders
const orderRoutes = new OrdersRoutes(routes);
orderRoutes.getRoutes({
  order,
  orderUpdate,
  paramDeliveryman,
  paramIdentification,
  paramId,
});

routes.use(Authorization);

// deliverymans
const deliverymanRoutes = new DeliverymansRoutes(routes);
deliverymanRoutes.getRoutes({ paramName, paramId, deliveryman });

// ingredients
const ingredientRoutes = new IngredientsRoutes(routes);
ingredientRoutes.getRoutes({ paramName, paramId, ingredient });

// reports
const reportRoutes = new ReportsRoutes(routes);
reportRoutes.getRoutes(report);

// printers
const printersRoutes = new PrintersRoutes(routes);
printersRoutes.getRoutes({ printer });

// serial

routes.get(
  '/serial_false',
  celebrate({ query: serial }),
  SerialController.exit,
);

export default routes;
