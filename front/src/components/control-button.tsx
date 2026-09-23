import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

type ControlButtonProps = {
  onShow(): void;
  onEdit(): void;
  onDelete(): void;
};

export function ControlButtons({
  onShow,
  onEdit,
  onDelete,
}: ControlButtonProps) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="icon" aria-label="Ver detalhes" onClick={onShow}>
        <Eye size={16} />
      </Button>
      <Button variant="icon" aria-label="Editar" onClick={onEdit}>
        <Pencil size={16} />
      </Button>
      <Button variant="icon" aria-label="Excluir" onClick={onDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
