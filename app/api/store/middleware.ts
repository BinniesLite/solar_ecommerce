import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function userValidationMiddleware(req: Request) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return NextResponse.next();
}