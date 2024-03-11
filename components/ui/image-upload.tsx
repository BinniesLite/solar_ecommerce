"use client"

import { useState, useEffect } from "react"

interface ImageUploadProps {
    disabled?: boolean,
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
    values: string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    values
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) { 
        return null;
    }   

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);

    }

    return <div>
        <div className="mb-4 flex items-center gap-4">
            {values.map((url) => (
                <div key={url}>
                    
                </div>
            ))}
        </div>
    </div>
}