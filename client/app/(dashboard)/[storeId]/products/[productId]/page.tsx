
import prismaDB from "@/lib/prisma"

import { ProductForm } from "./components/product-form"

interface ProductPageProps {
    params: { productId: string, storeId: string }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    
    const product = await prismaDB.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            category: true,
            size: true,
            images: true
            
        }
    })   

    // console.log(product); 

    // Pass in the from 
    
    const categories = await prismaDB.category.findMany({
        where: {
            storeId: params.storeId
        }
    })

    const sizes = await prismaDB.size.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 py-8 px-4">
                <ProductForm 
                    initialData={product}
                    categories={categories}
                    sizes={sizes}
                />

            </div>

        </div>
    )
}

export default ProductPage