import express from 'express';

import ProductController from './app/controllers/ProductController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DistrictController from './app/controllers/DistrictController';
import ClientController from './app/controllers/ClientController';
import OrderController from './app/controllers/OrderController';

const routes = express.Router();
// Products
routes.get('/products', ProductController.index);
routes.get('/products/:name', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

// Deliverymans
routes.get('/deliverymans', DeliverymanController.index);
routes.get('/deliverymans/avaliables', DeliverymanController.show);
routes.get('/deliverymans/working_days', DeliverymanController.showByWorking);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.put('/deliverymans', DeliverymanController.reset);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

// District
routes.get('/districts', DistrictController.index);
routes.get('/districts/:id', DistrictController.show);
routes.post('/districts', DistrictController.store);
routes.put('/districts/:id', DistrictController.update);
routes.delete('/districts/:id', DistrictController.delete);

// Client
routes.get('/clients', ClientController.index);
routes.get('/clients/:name', ClientController.show);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

// Order
// routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
// routes.put('/orders/:id', OrderController.update);
// routes.delete('/orders/:id', OrderController.delete);

export default routes;
