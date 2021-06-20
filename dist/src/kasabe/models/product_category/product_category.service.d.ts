import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';
import { ProductCategory } from './product_category.entity';
import { ProductCategoryRepository } from './product_category.repository';
export declare class ProductCategoryService {
    private productCategoryRepository;
    constructor(productCategoryRepository: ProductCategoryRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(category: CreateProductCategoryInput): Promise<ProductCategory>;
    rebuild(category: UpdateProductCategoryInput): Promise<ProductCategory>;
    fetchById(rId: number): Promise<ProductCategory>;
}
