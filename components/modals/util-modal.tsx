/*


    I want to create a modal that kinda deal with edit like for everything 
    It mainly deal with editing functionalities 

    But what if I have to deal with page that has images and stuff 
    How do I deal with that?
*/
"use client"

import { Modal } from "@/components/ui/modal"

import { Form } from "@/components/ui/form"
import { useState } from "react"

interface UtilModalProps {
    fields: { label: string, type: string}[]
    isOpen: boolean, 
    setIsOpen: (val: boolean) => void
}

export const UtilModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <Modal
        title="Util Modal"
        description="Edit something"
        open={isOpen}
        onClose={() => setIsOpen(false)}
    >

    
    </Modal>
}