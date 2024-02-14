import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
    title?: string;
    subTitle?: string;
    modalOpen?: boolean;
    setModalOpen?: (value: boolean) => void;
    className?: string;
    children: React.ReactNode;
    showCancelButton?: boolean;
}

export function InitialSelectGisDataModal({ title, subTitle, children, className, showCancelButton = true }: ModalProps) {
    return (
        <Dialog open={true}>
            <DialogContent showCancelButton={showCancelButton} className={cn("max-h-[700px] overflow-y-auto", className)}>
                <DialogHeader >
                    {title && <DialogTitle className="text-3xl text-theme">{title}</DialogTitle>}
                    {subTitle &&
                        <DialogDescription className="text-xs">
                            {subTitle}
                        </DialogDescription>
                    }
                </DialogHeader>
                <hr />
                {children}
            </DialogContent>
        </Dialog>
    )
}
