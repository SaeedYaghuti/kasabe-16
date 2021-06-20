import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';
import { ProductCategory } from './product_category.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class ProductCategoryResolver {
    private productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    productCategoryTestQuery(message: string): Promise<MessageType>;
    productCategoryTestMutation(message: string): Promise<MessageType>;
    build(productCategory: CreateProductCategoryInput): Promise<ProductCategory>;
    fetchById(productCategory_id: number): Promise<ProductCategory>;
    rebuild(productCategory: UpdateProductCategoryInput): Promise<ProductCategory>;
}
