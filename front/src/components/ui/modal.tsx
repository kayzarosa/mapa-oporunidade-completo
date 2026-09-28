import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
};

export function Modal({ open, onOpenChange, title, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-ink/40" />

        <Dialog.Content
          aria-describedby={undefined}
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[calc(100%-32px)] max-w-110 max-h-[85dvh] overflow-y-auto
                    rounded-card border border-line bg-surface p-5`}
        >
          <Dialog.Title className="mb-5 text-[20px] font-semibold text-ink">
            {title}
          </Dialog.Title>

          {children}

          <Dialog.Close className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600">
            <X size={18} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
