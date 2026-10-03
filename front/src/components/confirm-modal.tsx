import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type ConfirmModalProps = {
  title: string;
  message: string;
  open: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmChange: () => void;
};

export function ConfirmModal({
  title,
  message,
  open,
  isLoading,
  isError,
  onOpenChange,
  onConfirmChange,
}: ConfirmModalProps) {
  return (
    <Modal open={open} title={title} onOpenChange={onOpenChange}>
      <div className="flex flex-col">
        <p className="text-[14px] font-normal text-ink">{message}</p>

        {isError && (
          <span className="mt-2 text-xs text-danger">
            Não foi possível excluir. Tente de novo.
          </span>
        )}

        <hr className="mt-5 border border-line" />

        <div className="flex flex-row justify-end mt-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            onClick={onConfirmChange}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Excluir processo
          </Button>
        </div>
      </div>
    </Modal>
  );
}
