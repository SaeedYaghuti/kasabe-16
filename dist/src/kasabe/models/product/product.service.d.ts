import { CreateProductInput } from './dto/create_product.input';
import { UpdateProductInput } from './dto/update_product.input';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(product: CreateProductInput): Promise<Product>;
    rebuild(product: UpdateProductInput): Promise<Product>;
    fetchById(rId: number): Promise<Product>;
}
