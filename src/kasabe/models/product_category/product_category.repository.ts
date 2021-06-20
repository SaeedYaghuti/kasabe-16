import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { ProductCategory } from './product_category.entity';
import { Product } from '../product/product.entity';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  
  private logger = new Logger('ProductCategoryRepository');

  // generate top most categories: current Assets, fixed Assets, expenditure, ...
  async build( rCategory: CreateProductCategoryInput ): Promise<ProductCategory> {
    
    console.log('ProductCategoryRepository rData: ', rCategory);

    const nCategory = new ProductCategory();

    Object.assign(nCategory, rCategory);

    const gProductCategory = await ProductCategory.save(nCategory);

    return this.fetchById(gProductCategory.id); 

    
    // nCategory.category_name = rCategory.category_name;
    // nCategory.category_description = rCategory.category_description;
    // nCategory.picture_url = rCategory.picture_url;
    // nCategory.isActive = rCategory.isActive;

    // // find whole category_parent by using parentId
    // if (rCategory.parentId) {
    //   try {
    //     const parentCategory = await ProductCategory.findOne(rCategory.parentId);
    //     if ( parentCategory ) {
    //       nCategory.parent = parentCategory;
    //     }
    //   } catch (error) {
    //     this.logger.error(
    //         `!> Failed to fetch parent category by id: ${JSON.stringify(rCategory.parentId)} ;`,
    //         error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //         message: '!> Failed to fetch parent category',
    //         origin: '@product_category.repository.ts',
    //         parnt_category_id: rCategory.parentId,
    //     });
    //   }
    // }

    // // search for sku maybe it's repeated => we should not allow to make as new product
    // if (rCategory.flag_product_id) {
    //   try {
    //     const flagProduct = await Product.findOne(rCategory.flag_product_id);
    //     nCategory.flag_product = flagProduct;
    //   } catch (error) {
    //     this.logger.error(
    //       `!> Failed to relate flag_product with id: ${JSON.stringify(rCategory.flag_product_id)} ;`,
    //        error.stack,
    //     );
    //     // It is not crusial we don't throw Exception
    //   }
    // }

    // try {
    //   const gCtg = await nCategory.save();
    //   console.log('gCtg: ', gCtg);
    //   return gCtg;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to save category: ${JSON.stringify(rCategory)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to save category',
    //     origin: '@product.repository.ts',
    //     product: rCategory,
    //   });
    // }

  }

  // generate top most categories: current Assets, fixed Assets, expenditure, ...
  async fetchById( rId: number ): Promise<ProductCategory> {
    
    console.log('fetchById rId: ', rId);

    const fProductCategory = await ProductCategory.findOne({ 
      where: { id: rId },
      // relations: ["person", "order"],
      relations: ["children", "parent", "flag_product", "products"],
    });
    return fProductCategory;


    // try {
    //   // relations
    //   // #1 children: Done
    //   // #2 parent: Done
    //   // #3 flag_product
    //   // #4 products:  Done automatically by eager:true

    //   // TODO: we must be able to fetch desire category by onley one complex query! not multiple times calling db
    //   // t1
    //   // const tCompleteCat = await this.manager
    //   //                               .getTreeRepository(ProductCategory)
    //   //                               .createDescendantsQueryBuilder("productCategory")
    //   //                               .findDescendants(fCategory);
      
    //   // t2
    //   // const tCompleteCat = await this.createQueryBuilder("product_category")
    //   //                               .innerJoinAndSelect()
        
        
    //   const fCategory = await ProductCategory.findOne(rId);
    //   console.log('fCategory: ', fCategory);

    //   // attach children category
    //   try {
    //     fCategory.children  = await this.manager
    //                                   .getTreeRepository(ProductCategory)
    //                                   .findDescendants(fCategory);
    //                                   // .findDescendantsTree(fCategory); // return nested tree
    //   } catch (error) {
    //     this.logger.error(
    //       `!> Failed to fetch category's children for: ${JSON.stringify(fCategory)} ;`,
    //        error.stack,
    //     );
    //   }

    //   // attach parent category
    //   try {

    //     fCategory.parent = await ProductCategory.findOne(fCategory.parentId);
    //     // const parents  = await  this.manager
    //     //                             .getTreeRepository(ProductCategory)
    //     //                             .findAncestors(fCategory);

    //     // const fcTree = await this.manager.getTreeRepository(ProductCategory).findTrees();
    //   } catch (error) {
    //     this.logger.error(
    //         `!> Failed to fetch parent category by id: ${JSON.stringify(fCategory.parentId)} ;`,
    //         error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //         message: '!> Failed to fetch parent category',
    //         origin: '@product_category.repository.ts',
    //         parntId: fCategory.parentId,
    //     });
    //   }

    //   // attach flag_product
    //   try {
    //     if (fCategory.flag_product_id) {
    //       fCategory.flag_product = await Product.findOne(fCategory.flag_product_id);
    //     }
    //   } catch (error) {
    //     this.logger.error(
    //       `!> Failed to fetch flag_product by id: ${JSON.stringify(fCategory.flag_product_id)} ;`,
    //        error.stack,
    //     );
    //   }

    //   return fCategory;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch category by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch category',
    //     origin: '@product_category.repository.ts',
    //     category_id: rId,
    //   });
    // }

  }
  
  
  async rebuild( rCategory: UpdateProductCategoryInput ): Promise<ProductCategory> {
    
    console.log('ProductCategoryRepository rData: ', rCategory);

    const fProductCategory = await ProductCategory.findOneOrFail(rCategory.id)

    const tuProductCategory = Object.assign(fProductCategory, rCategory);

    // console.log('<<uS>> tuProductCategory:', tuProductCategory);

    await ProductCategory.save(tuProductCategory);

    const uProductCategory = this.fetchById(rCategory.id)

    return uProductCategory;

    // const nCategory = new ProductCategory();
    // nCategory.id = rCategory.id;
    // nCategory.category_name = rCategory.category_name;
    // nCategory.category_description = rCategory.category_description;
    // nCategory.parentId = rCategory.parentId;
    // nCategory.flag_product_id = rCategory.flag_product_id;
    // nCategory.picture_url = rCategory.picture_url;
    // nCategory.isActive = rCategory.isActive;

    // try {
    //   await nCategory.save();
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update category: ${JSON.stringify(rCategory)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update category',
    //     origin: '@product.repository.ts',
    //     product: rCategory,
    //   });
    // }

    // return await this.fetchById(rCategory.id);

  }


}

export class ProductCategoryRepositoryFake {
  public async build(): Promise<void> {}
  public async rebuild(): Promise<void> {}
  public async fetchById(): Promise<void> {}
}
