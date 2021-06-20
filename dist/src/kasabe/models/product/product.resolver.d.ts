import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create_product.input';
import { UpdateProductInput } from './dto/update_product.input';
import { Product } from './product.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class ProductResolver {
    private productService;
    constructor(productService: ProductService);
    productTestQuery(message: string): Promise<MessageType>;
    productTestMutation(message: string): Promise<MessageType>;
    build(product: CreateProductInput): Promise<Product>;
    rebuild(product: UpdateProductInput): Promise<Product>;
    fetchById(rId: number): Promise<Product>;
}
