import { create } from 'zustand';

interface ModalStoreHook {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
};

export const useStoreModal = create<ModalStoreHook>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({isOpen: false})
}));
