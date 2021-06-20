import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create_product.input';
import { Product } from './product.entity';
import { UpdateProductInput } from './dto/update_product.input';
export declare class ProductRepository extends Repository<Product> {
    private logger;
    build(rProduct: CreateProductInput): Promise<Product>;
    fetchById(rId: number): Promise<Product>;
    rebuild(rProduct: UpdateProductInput): Promise<Product>;
}
export declare class ProductRepositoryFake {
    build(): Promise<void>;
    rebuild(): Promise<void>;
    fetchById(): Promise<void>;
}
