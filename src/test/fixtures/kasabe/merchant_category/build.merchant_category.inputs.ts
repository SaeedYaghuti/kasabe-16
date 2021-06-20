import { BuildMerchantCategoryInput } from '../../../../kasabe/models/merchant_category/dto/create_merchant_category.input';

export const BuildMerchantCategoryInputs: BuildMerchantCategoryInput[] = [
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
