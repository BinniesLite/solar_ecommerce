"use client"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-modal-store";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        open={storeModal.isOpen}
        onClose={storeModal.onClose}
    >   
        Create a new store 
    </Modal>
}