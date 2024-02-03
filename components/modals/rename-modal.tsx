"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { useEffect, useState } from "react";


const RenameModal = () => {
    const{isOpen, onClose, initialValues} = useRenameModal();
    const [title, setTitle] = useState(initialValues.title);
    useEffect(() => {
      setTitle(initialValues.title);
    }, [initialValues.title])

    const onSubmit=()=>{}
    
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit board title
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>Enter a new title here for this board</DialogDescription>
            <form></form>
        </DialogContent>
    </Dialog>
  )
}

export default RenameModal