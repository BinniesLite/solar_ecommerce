// Create a list of API-Alert for ease of used

import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
    
    entityName: string,
    entityId: string
}   

interface ApiLists {
    url: string,
    variant: "public" | "admin",
    request: string
}


export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityId
}) => {
    const params = useParams();
    // I can extract base url here
    // TODO: Extract baseurl
    const origin = useOrigin();
    const baseUrl = `${origin}/api`;

    const apiList: ApiLists[] =  [
        {
            url: `${baseUrl}/${params.storeId}/${entityName}`,
            variant: "public",
            request: "GET"
        },
        {
            url: `${baseUrl}/${params.storeId}/${entityName}/${entityId}`,
            variant: "public",
            request: "GET"
        },
        {
            url: `${baseUrl}/${params.storeId}/${entityName}`,
            variant: "admin",
            request: "POST"
        },
        {
            url: `${baseUrl}/${params.storeId}/${entityName}/${entityId}`,
            variant: "admin",
            request: "PATCH"
        },
        {
            url: `${baseUrl}/${params.storeId}/${entityName}/${entityId}`,
            variant: "admin",
            request: "DELETE"
        },

    ]


    // TODO Extract 
    

    return <>
        {apiList.map((api) => (
            <ApiAlert
                title={api.request}
                variant={api.variant}
                description={api.url}
            />
              
        ))}
    </>

}