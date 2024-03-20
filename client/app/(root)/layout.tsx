import { auth } from '@clerk/nextjs'; 

import { currentUser } from '@clerk/nextjs';

import { redirect } from 'next/navigation';


import prismaDB from '@/lib/prisma';


import { allowUsersEmail } from '@/constants/allow-user';

import axios from 'axios';


export default async function SetupLayout({children}: {children: React.ReactNode}) {
    const { userId } = auth();
    const user = await currentUser();
    const currentUserEmail = user?.emailAddresses

    if (!currentUserEmail || !allowUsersEmail.includes(currentUserEmail)) {
        // Redirect if user is not authenticated or not allowed
        return <>
            You shall not passed
        </>
    }

    if (!userId) { 
        redirect("/sign-in");
    }


    
    // try {
        
    //     const storeDemo = await axios.get("http://localhost:4000/api/store", {
    //         headers: {
    //             "userId": userId
    //         }
    //     })

    //     console.log("ROOT STORE", storeDemo?.data)
    // } catch (error) {
    //     console.log(error )
    // } 
    


    const store = await prismaDB.store.findFirst({
        where: {
            userId: userId
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    // Let the thought flow to where it comes from nowhere
    return <>
        {children}
    </>
    
}