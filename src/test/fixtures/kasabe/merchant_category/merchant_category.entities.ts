import { MerchantCategory } from "../../../../kasabe/models/merchant_category/merchant_category.entity";
import { Merchant } from "../../../../kasabe/models/merchant/merchant.entity";

export const MerchantCategoryEntities: Partial<MerchantCategory> [] = [
    {
        category_name: "Bulding",
        category_description: "includes pinting, building, iron,...",
        // parentId: null,
        // flag_merchant_id: 1,
        picture_url: "30966443811696465.jpeg",
        isActive: true,
    },
    {
        category_name: "Painting",
        category_description: "includes pinting wall, doors, iron ...",
        parentId: 1,
        // flag_merchant_id: 1,
        picture_url: "30966443811696465.jpeg",
        isActive: true,
    },
    
]
