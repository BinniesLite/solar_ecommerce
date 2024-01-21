"use client"

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-modal-store";


import Image from "next/image";


export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen])

  return (
    <main className="">
        
    </main>
  );
}
