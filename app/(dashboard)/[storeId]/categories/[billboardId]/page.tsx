
import prismaDB from "@/lib/prisma"

import { CategoryForm } from "./components/category-form"

interface BillboardPageProps {
    params: { storeId: string }
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params }) => {
    
    const category = await prismaDB.category.findUnique({
        where: {
            id: params.storeId
        }
        
    })   

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 py-8 px-4">
                <CategoryForm 
                    initialData={category}
                />

            </div>

        </div>
    )
}

export default BillboardPage