import { UpdateProductCategoryInput } from "../../../../kasabe/models/product_category/dto/update_product_category.input";
import { CreateProductCategoryInput } from "../../../../kasabe/models/product_category/dto/create_product_category.input";


export const UpdateProductCategoryInputs: UpdateProductCategoryInput[] = [
    
    {
        id: 1,
        category_name: "new Foods",
        category_description: "new includes eatable stuff",
        parentId: null,
        // flag_product_id: 1,
        picture_url: "food.jpg",
        isActive: true,
    },
    
    
]
