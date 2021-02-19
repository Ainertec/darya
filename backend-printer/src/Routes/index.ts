import { Router } from 'express';

// validations

import printer from '../validations/printerSchema';

import { PrintersRoutes } from './Printers.routes';

const routes = Router();

// printers
const printersRoutes = new PrintersRoutes(routes);
printersRoutes.getRoutes({ printer });

export default routes;
