import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();

        const body = await req.json();
    
        const { name, billboardId } = body;
    
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
    
        
        if (!billboardId) {
            return new NextResponse("Image Url is required", { status: 400 });
        }
    
        if (!params.categoryId) {
            return new NextResponse("Category Id is required", { status: 400 });
        }
    
        const storeByUserId = prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) { 
            return new NextResponse("Unauthorized Access", { status: 403 });
        }
    
        const category = await prismaDB.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })
    
        return NextResponse.json(category);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
   
}

// Need to have request and params
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.categoryId) {
            return new NextResponse("Category Id is required", { status: 400 });
        }

        const storeByUserId = prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) { 
            return new NextResponse("Unauthorized Access", { status: 403 });
        }

        const category = await prismaDB.category.deleteMany({
            where: {
                id: params.categoryId
            },
        });

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log("[STORE_STOREID]", error)
        return new NextResponse("Something is wrong", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {

        if (!params.billboardId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        const billboard = await prismaDB.billboard.findUnique({
            where: {
                id: params.billboardId
            },
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse("Something is wrong", { status: 500 });
    }
}