"use client"

import { cn } from "@/lib/utils"
import Link  from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ 
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
    
    const pathName = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params?.storeId}`, // add a questions mark to safe guard lol
            label: 'Overview',
            active: pathName === `/${params.storeId}`
        },
        {
            href: `/${params?.storeId}/billboards`, // add a questions mark to safe guard lol
            label: 'Billboards',
            active: pathName === `/${params.storeId}/billboards`
        },
        {
            href: `/${params?.storeId}/products`, // add a questions mark to safe guard lol
            label: 'Products',
            active: pathName === `/${params.storeId}/products`
        },
        {
            href: `/${params?.storeId}/categories`, // add a questions mark to safe guard lol
            label: 'Categories',
            active: pathName === `/${params.storeId}/categories`
        },
        {
            href: `/${params?.storeId}/sizes`, // add a questions mark to safe guard lol
            label: 'Sizes',
            active: pathName === `/${params.storeId}/sizes`
        },
        {
            href: `/${params?.storeId}/settings`, // add a questions mark to safe guard lol
            label: 'Settings',
            active: pathName === `/${params.storeId}/settings`
        }
    ];  


    return ( 
        // Merge the className we have to the default ones
        <nav 
            className={cn("flex items-center space-x-4 lg:space-x-6 ml-3", className)}
        >
            {routes.map((route) => (
                <Link 
                    key={route.href} 
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "hover:text-white text-white dark:text-white bg-black p-2 rounded" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
};