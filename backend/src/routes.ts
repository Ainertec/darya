import express from 'express';

import ProductController from './app/controllers/ProductController';

const routes = express.Router();

routes.get('/products', ProductController.index);
routes.get('/products/:name', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes;
