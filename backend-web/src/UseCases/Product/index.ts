import { Product } from '../../Entity/Product';
import { MongoProductRepository } from '../../Repositories/implementation/MongoProductRepository';
import { ProductController } from './ProductController';
import { ProductUseCase } from './ProductUseCase';

const repository = new MongoProductRepository(Product);

const productUseCase = new ProductUseCase(repository);

const productController = new ProductController(productUseCase);

export { productController, productUseCase };
