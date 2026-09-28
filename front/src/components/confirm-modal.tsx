import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type ConfirmModalProps = {
  title: string;
  message: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmChange: () => void;
};

export function ConfirmModal({
  title,
  message,
  open,
  onOpenChange,
  onConfirmChange,
}: ConfirmModalProps) {
  return (
    <Modal open={open} title={title} onOpenChange={onOpenChange}>
      <div className="flex flex-col">
        <p className="text-[14px] font-normal text-ink">{message}</p>

        <hr className="mt-5 border border-line" />

        <div className="flex flex-row justify-end mt-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button type="button" onClick={onConfirmChange}>
            Excluir processo
          </Button>
        </div>
      </div>
    </Modal>
  );
}
