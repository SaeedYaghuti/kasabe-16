import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateProductInput } from './dto/create_product.input';
import { async } from 'rxjs/internal/scheduler/async';
import { Product } from './product.entity';
import { ProductCategory } from '../product_category/product_category.entity';
import { Tag } from '../tag/tag.entity';
import { UpdateProductInput } from './dto/update_product.input';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository');

  // generate top most categories: current Assets, fixed Assets, expenditure, ...
  async build( rProduct: CreateProductInput ): Promise<Product> {
    console.log('repostory rData: ', rProduct);

    const nProduct = new Product();

    Object.assign(nProduct, rProduct);

    // nProduct.sku = rProduct.sku;
    // nProduct.supplier_sku = rProduct.supplier_sku;
    // // category
    // nProduct.product_name = rProduct.product_name;
    // nProduct.msrp = rProduct.msrp;
    // nProduct.price = rProduct.price;
    // nProduct.price_currency = rProduct.price_currency;
    // nProduct.currency_symbole = rProduct.currency_symbole;
    // nProduct.unit_title = rProduct.unit_title;
    // nProduct.unit_weight = rProduct.unit_weight;
    // nProduct.unit_weight_title = rProduct.unit_weight_title;
    // nProduct.is_discount = rProduct.is_discount;
    // nProduct.discount = rProduct.discount;
    // nProduct.ranking = rProduct.ranking;
    // nProduct.reorder_level = rProduct.reorder_level;
    // nProduct.is_active = rProduct.is_active;

    // fetch product_category
    // if (rProduct.product_category_id) {
    //   const category = await ProductCategory.findOne(rProduct.product_category_id);
    //   if ( category ) {
    //     nProduct.category = category;
    //   }
    // }
    
    //fetch Tags 🎯 ToDo: how to deal with tags?
    // const tags = await Promise.all(rProduct?.tag_ids?.map(tagId => {
    //   try {
    //     return Tag.findOne(tagId);
    //   } catch (error) {
    //     this.logger.warn(
    //       `!> Failed to fetch tag with id : ${tagId};`
    //     );
    //     return;
    //   }

    // }))
    // nProduct.tags = tags;

    const gProduct = await Product.save(nProduct);

    return this.fetchById(gProduct.product_id);

    // search for sku maybe it's repeated => we should not allow to make as new product
    // if (rProduct.sku) {
    //   const found = await Product.findOne({
    //     where: { sku: rProduct.sku },
    //   });

    //   if ( found ) {
    //     this.logger.error(
    //         `!> Failed to save product: ${JSON.stringify(rProduct)};\n
    //         We already have a product with the same sku: ${JSON.stringify(found)};`
    //     );

    //     throw new InternalServerErrorException({
    //         message: '!> we already have a product with this SKU',
    //         origin: '@product.repository.ts',
    //         product: found,
    //     });
    //   }
    // }

    // try {
    //   const gPrd = await nProduct.save();
    //   console.log('gPrd: ', gPrd);
    //   return gPrd;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to save product: ${JSON.stringify(rProduct)} ";`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to save product',
    //     origin: '@product.repository.ts',
    //     product: rProduct,
    //     error: error.stack,
    //   });
    // }

  }


  // Get
  async fetchById( rId: number ): Promise<Product> {
    console.log('fetchById rId: ', rId);

    const fProduct = await Product.findOne({ 
      where: { product_id: rId },
      relations: ["category", "tags", "order_details"],
    });
    console.log('fetchById fProduct: ', fProduct);
    return fProduct;

    // try {
    //   // fetch complete product
    //   const fCompProduct = await this.createQueryBuilder("product")
    //                            .leftJoinAndSelect("product.category", "category")
    //                            .leftJoinAndSelect("product.tags", "tags")
    //                            .getOne();

    //   console.log('fCompProduct: ', fCompProduct);

    //   return fCompProduct;

    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch product by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch product',
    //     origin: '@product.repository.ts',
    //     product_id: rId,
    //     error: error.stack,
    //   });
    // }


  } // Product End
  
  
  // generate top most categories: current Assets, fixed Assets, expenditure, ...
  async rebuild( rProduct: UpdateProductInput ): Promise<Product> {
    console.log('repostory rData: ', rProduct);

    const nProduct = new Product();
    nProduct.product_id = rProduct.product_id;
    nProduct.sku = rProduct.sku;
    nProduct.supplier_sku = rProduct.supplier_sku;
    nProduct.supplier_sku = rProduct.supplier_sku;
    nProduct.product_category_id = rProduct.product_category_id;
    nProduct.product_name = rProduct.product_name;
    nProduct.msrp = rProduct.msrp;
    nProduct.price = rProduct.price;
    nProduct.price_currency = rProduct.price_currency;
    nProduct.currency_symbole = rProduct.currency_symbole;
    nProduct.unit_title = rProduct.unit_title;
    nProduct.unit_weight = rProduct.unit_weight;
    nProduct.unit_weight_title = rProduct.unit_weight_title;
    nProduct.is_discount = rProduct.is_discount;
    nProduct.discount = rProduct.discount;
    nProduct.ranking = rProduct.ranking;
    nProduct.reorder_level = rProduct.reorder_level;
    nProduct.is_active = rProduct.is_active;
    
    const tagEntities: Tag[] = [];
    for (const tagEl of rProduct.rebuildsInput) {
      const nTag = new Tag();
      nTag.tag_id = tagEl.tag_id;
      nTag.tag_title = tagEl.tag_title;

      tagEntities.push(nTag);
    } // for End

    nProduct.tags = tagEntities;

    try {
      const gPrd = await nProduct.save();
      console.log('gPrd: ', gPrd);
      return gPrd;
    } catch (error) {
      this.logger.error(
        `!> Failed to update product: ${JSON.stringify(rProduct)} ";`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update product',
        origin: '@product.repository.ts',
        product: rProduct,
        error: error.stack,
      });
    }
  }

}


export class ProductRepositoryFake {
  public async build(): Promise<void> {}
  public async rebuild(): Promise<void> {}
  public async fetchById(): Promise<void> {}
}
