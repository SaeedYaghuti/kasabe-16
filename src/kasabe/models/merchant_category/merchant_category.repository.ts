import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
import { MerchantCategory } from './merchant_category.entity';
import { Merchant } from '../merchant/merchant.entity';
import { UpdateMerchantCategoryInput } from './dto/update_merchant_category.input';

@EntityRepository(MerchantCategory)
export class MerchantCategoryRepository extends Repository<MerchantCategory> {
  
  private logger = new Logger('MerchantCategoryRepository');

  // generate top most categories: current Assets, fixed Assets, expenditure, ...
  async build( rCategory: BuildMerchantCategoryInput ): Promise<MerchantCategory> {
    
    console.log('MerchantCategoryRepository rData: ', rCategory);

    const nCategory = new MerchantCategory();

    Object.assign(nCategory, rCategory);

    const gMerchantCategory = await MerchantCategory.save(nCategory);

    return this.fetchById(gMerchantCategory.id); 

    
    // nCategory.category_name = rCategory.category_name;
    // nCategory.category_description = rCategory.category_description;
    // nCategory.picture_url = rCategory.picture_url;
    // nCategory.isActive = rCategory.isActive;

    // // find whole category_parent by using parentId
    // if (rCategory.parentId) {
    //   try {
    //     const parentCategory = await MerchantCategory.findOne(rCategory.parentId);
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
    //         origin: '@merchant_category.repository.ts',
    //         parnt_category_id: rCategory.parentId,
    //     });
    //   }
    // }

    // // search for sku maybe it's repeated => we should not allow to make as new merchant
    // if (rCategory.flag_merchant_id) {
    //   try {
    //     const flagMerchant = await Merchant.findOne(rCategory.flag_merchant_id);
    //     nCategory.flag_merchant = flagMerchant;
    //   } catch (error) {
    //     this.logger.error(
    //       `!> Failed to relate flag_merchant with id: ${JSON.stringify(rCategory.flag_merchant_id)} ;`,
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
    //     origin: '@merchant.repository.ts',
    //     merchant: rCategory,
    //   });
    // }

  }

  // generate top most categories: current Assets, fixed Assets, expenditure, ...
  async fetchById( rId: number ): Promise<MerchantCategory> {
    
    console.log('fetchById rId: ', rId);

    const fMerchantCategory = await MerchantCategory.findOne({ 
      where: { id: rId },
      // relations: ["person", "order"],
      relations: ["children", "parent", "flag_merchant", "merchants"],
    });
    return fMerchantCategory;


    // try {
    //   // relations
    //   // #1 children: Done
    //   // #2 parent: Done
    //   // #3 flag_merchant
    //   // #4 merchants:  Done automatically by eager:true

    //   // TODO: we must be able to fetch desire category by onley one complex query! not multiple times calling db
    //   // t1
    //   // const tCompleteCat = await this.manager
    //   //                               .getTreeRepository(MerchantCategory)
    //   //                               .createDescendantsQueryBuilder("merchantCategory")
    //   //                               .findDescendants(fCategory);
      
    //   // t2
    //   // const tCompleteCat = await this.createQueryBuilder("merchant_category")
    //   //                               .innerJoinAndSelect()
        
        
    //   const fCategory = await MerchantCategory.findOne(rId);
    //   console.log('fCategory: ', fCategory);

    //   // attach children category
    //   try {
    //     fCategory.children  = await this.manager
    //                                   .getTreeRepository(MerchantCategory)
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

    //     fCategory.parent = await MerchantCategory.findOne(fCategory.parentId);
    //     // const parents  = await  this.manager
    //     //                             .getTreeRepository(MerchantCategory)
    //     //                             .findAncestors(fCategory);

    //     // const fcTree = await this.manager.getTreeRepository(MerchantCategory).findTrees();
    //   } catch (error) {
    //     this.logger.error(
    //         `!> Failed to fetch parent category by id: ${JSON.stringify(fCategory.parentId)} ;`,
    //         error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //         message: '!> Failed to fetch parent category',
    //         origin: '@merchant_category.repository.ts',
    //         parntId: fCategory.parentId,
    //     });
    //   }

    //   // attach flag_merchant
    //   try {
    //     if (fCategory.flag_merchant_id) {
    //       fCategory.flag_merchant = await Merchant.findOne(fCategory.flag_merchant_id);
    //     }
    //   } catch (error) {
    //     this.logger.error(
    //       `!> Failed to fetch flag_merchant by id: ${JSON.stringify(fCategory.flag_merchant_id)} ;`,
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
    //     origin: '@merchant_category.repository.ts',
    //     category_id: rId,
    //   });
    // }

  }
  
  
  async rebuild( rCategory: UpdateMerchantCategoryInput ): Promise<MerchantCategory> {
    
    console.log('MerchantCategoryRepository rData: ', rCategory);

    const fMerchantCategory = await MerchantCategory.findOneOrFail(rCategory.id)

    const tuMerchantCategory = Object.assign(fMerchantCategory, rCategory);

    // console.log('<<uS>> tuMerchantCategory:', tuMerchantCategory);

    await MerchantCategory.save(tuMerchantCategory);

    const uMerchantCategory = this.fetchById(rCategory.id)

    return uMerchantCategory;

    // const nCategory = new MerchantCategory();
    // nCategory.id = rCategory.id;
    // nCategory.category_name = rCategory.category_name;
    // nCategory.category_description = rCategory.category_description;
    // nCategory.parentId = rCategory.parentId;
    // nCategory.flag_merchant_id = rCategory.flag_merchant_id;
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
    //     origin: '@merchant.repository.ts',
    //     merchant: rCategory,
    //   });
    // }

    // return await this.fetchById(rCategory.id);

  }


}

export class MerchantCategoryRepositoryFake {
  public async build(): Promise<void> {}
  public async rebuild(): Promise<void> {}
  public async fetchById(): Promise<void> {}
}
