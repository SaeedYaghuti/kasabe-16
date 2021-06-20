import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create_product.input';
import { UpdateProductInput } from './dto/update_product.input';
import { Product } from './product.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Product')
export class ProductResolver {
    // Constructor
    constructor(
        private productService: ProductService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async productTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('productTestQuery is running...');
        return await this.productService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async productTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.productService.testQuery(message);
    }
    
    //#endregion

    // Product
    @Mutation(() => Product)
    async build( @Args('product') product: CreateProductInput ): Promise<Product> {
        console.log('mutation build() is running...');
        return await this.productService.build(product);
    }
    @Mutation(() => Product)
    async rebuild( @Args('product') product: UpdateProductInput ): Promise<Product> {
        console.log('mutation rebuild() is running...');
        return await this.productService.rebuild(product);
    }
    @Query(() => Product)
    async fetchById(@Args('product_id') rId: number): Promise<Product> {
        return await this.productService.fetchById(rId);
    }

}
