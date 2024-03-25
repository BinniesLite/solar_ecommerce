import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();

        const body = await req.json();
        const { name, price, categoryId, sizeId, images, isFeatured, isArchived } = body;

        // Function to simplify validation
        const validateField = (field: any, fieldName: any) => {
            if (!field) return new NextResponse(`${fieldName} is required`, { status: 400 });
        };

        // Validate required fields
        validateField(name, "Name");
        validateField(price, "Price");
        validateField(images, "Images");


        validateField(categoryId, "Category ID");
        validateField(sizeId, "Size ID");
        validateField(params.storeId, "Store ID");

        const storeByUserId = await prismaDB.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!images) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }


        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        console.log("Something is working here", params.productId)
        const product2 = await prismaDB.product.findFirst({
            where: {
                id: params.productId
            }
        })

        console.log("[Product Exist]", product2)

        const product = await prismaDB.product.update({
            where: {
                id: params.productId,
            },

            data: {
                name,
                price,
                categoryId: categoryId,
                sizeId: sizeId, 
                images: {
                    deleteMany: {}
                }, 
                isFeatured, 
                isArchived, 
                storeId: params.storeId
            },
        });

        console.log("Something is working here 2")

        await prismaDB.product.update({ 
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [ ...images.map((image: { url: string}) => image)]
                    }
                }
            }
        })

        

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_PATCH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
   
}

// Need to have request and params
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, productId : string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.productId ) {
            return new NextResponse("Store Id is required", { status: 400 });
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

        const product = await prismaDB.product.deleteMany({
            where: {
                id: params.productId 
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("[STORE_STOREID]", error)
        return new NextResponse("Something is wrong", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {

        if (!params.productId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }

        const product = await prismaDB.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
                category: true,
                size: true
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse("Something is wrong", { status: 500 });
    }
}