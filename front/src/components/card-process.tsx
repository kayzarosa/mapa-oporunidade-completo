import { Badge } from "@/components/badge";
import { ControlButtons } from "@/components/control-button";
import { Laugh, MessageSquare } from "lucide-react";

export function CardProcess() {
  return (
    <div className="w-full flex flex-col justify-between p-5 gap-0.5 border-2 border-line rounded-card">
      <div className="w-full top-0 sm:hidden flex justify-end">
        <ControlButtons
          onShow={() => console.log("show")}
          onEdit={() => console.log("edit")}
          onDelete={() => console.log("delete")}
        />
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-between gap-1">
          <span className="truncate text-[15px] font-medium text-ink-muted ">
            Nubank
          </span>

          <Laugh size={15} className="text-accent" />

          <MessageSquare size={15} className="text-ink" />
        </div>

        <div className="flex items-center gap-1">
          <span className="mr-2 text-xs text-ink-muted">técnica</span>

          <div className="sm:inline hidden">
            <ControlButtons
              onShow={() => console.log("show")}
              onEdit={() => console.log("show")}
              onDelete={() => console.log("show")}
            />
          </div>
        </div>
      </div>

      <span className="first-letter:uppercase text-sm text-ink-muted">
        Desenvovedora frontend júnior
      </span>

      <Badge variant="urgente" className="mt-2">
        Desafio vence amanhã
      </Badge>
    </div>
  );
}
