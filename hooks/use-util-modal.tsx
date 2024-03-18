import { util } from "zod";
import { create } from "zustand";

interface utilModalProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useUtilModal = create<utilModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}))