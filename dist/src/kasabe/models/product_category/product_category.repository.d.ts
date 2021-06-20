import { Repository } from 'typeorm';
import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { ProductCategory } from './product_category.entity';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';
export declare class ProductCategoryRepository extends Repository<ProductCategory> {
    private logger;
    build(rCategory: CreateProductCategoryInput): Promise<ProductCategory>;
    fetchById(rId: number): Promise<ProductCategory>;
    rebuild(rCategory: UpdateProductCategoryInput): Promise<ProductCategory>;
}
export declare class ProductCategoryRepositoryFake {
    build(): Promise<void>;
    rebuild(): Promise<void>;
    fetchById(): Promise<void>;
}
