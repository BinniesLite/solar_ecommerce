
import prismaDB from "@/lib/prisma"

import { BillboardForm } from "./components/billboard-form"

interface BillboardPageProps {
    params: { billboardId: string }
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params }) => {

    const billboard = await prismaDB.billboard.findUnique({
        where:  {
            id: params.billboardId
        }
    });


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 py-8">
                <BillboardForm 
                
                />

            </div>

        </div>
    )
}

export default BillboardPage