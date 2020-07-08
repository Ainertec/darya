import express from 'express';

import ProductController from './app/controllers/ProductController';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = express.Router();
// Products
routes.get('/products', ProductController.index);
routes.get('/products/:name', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

//Deliverymans
routes.get('/deliverymans', DeliverymanController.index);
routes.get('/deliverymans/:id', DeliverymanController.show);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

export default routes;
