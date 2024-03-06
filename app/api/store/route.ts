import { NextResponse } from "next/server";

import {v4} from 'uuid';

import prismaDB from "@/lib/prisma";

export async function POST(
    req: Request
) {
    try {
        const body  = await req.json();

        const { name } = body;

        if (!name) {
            return new NextResponse("Name is Required", { status: 400 });
        }

        const store = await prismaDB.store.create({
            data: {
                name,
                userId: v4()
            }
        });

        return NextResponse.json(store);
    }
    catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Error", {status: 500});
    }
}