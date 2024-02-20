import {
    Sheet,
    SheetContent,
    SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface ModalProps {
    title?: string;
    subTitle?: string;
    modalOpen: boolean;
    setModalOpen(value: boolean): void;
    className?: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
}

export function SheetBar({ children, title, modalOpen, setModalOpen, className, side = "left" }: ModalProps) {
    return (
        <Sheet key={side} defaultOpen={true} open={modalOpen} onOpenChange={setModalOpen}>
            <SheetContent side={side} className={cn(className)}>
                <SheetTitle>{title || ""}</SheetTitle>
                {children}
            </SheetContent>
        </Sheet>
    )
}
