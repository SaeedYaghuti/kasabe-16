import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';
import { ProductCategory } from './product_category.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('ProductCategory')
export class ProductCategoryResolver {
    // Constructor
    constructor(
        private productCategoryService: ProductCategoryService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async productCategoryTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('productCategoryTestQuery is running...');
        return await this.productCategoryService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async productCategoryTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.productCategoryService.testQuery(message);
    }
    
    //#endregion

    // Product_Category
    @Mutation(() => ProductCategory)
    async build( @Args('productCategory') productCategory: CreateProductCategoryInput ): Promise<ProductCategory> {
        console.log('mutation build() is running...');
        return await this.productCategoryService.build(productCategory);
    }
    @Query(() => ProductCategory)
    async fetchById(@Args('productCategory_id') productCategory_id: number): Promise<ProductCategory> {
        return await this.productCategoryService.fetchById(productCategory_id);
    }
    @Mutation(() => ProductCategory)
    async rebuild( @Args('productCategory') productCategory: UpdateProductCategoryInput ): Promise<ProductCategory> {
        console.log('mutation rebuild() is running...');
        return await this.productCategoryService.rebuild(productCategory);
    }
    

}
