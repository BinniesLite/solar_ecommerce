"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-modal-store";
// trigerring next cache lol, wtf is that

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {

    console.log("[Store-Modal] here")
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <main className="">
        
    </main>
  );
}
