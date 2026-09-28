import { Badge } from "@/components/badge";
import { ControlButtons } from "@/components/control-button";
import { expectationIcons } from "@/lib/icons";
import type { ProcessListItem } from "@/types/process";
import { Laugh, MessageSquare, Repeat } from "lucide-react";

type CardProcessProps = {
  process: ProcessListItem;
};

export function CardProcess({ process }: CardProcessProps) {
  const expectation = process.expectation
    ? expectationIcons[process.expectation]
    : null;

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
            {process.company}
          </span>

          {expectation && (
            <expectation.icon
              size={15}
              className={`shrink-0 ${expectation.className}`}
            />
          )}

          {process.note && (
            <MessageSquare size={15} className="shrink-0 text-ink" />
          )}
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
        {process.role}
      </span>

      {
        (process.previousApplications > 0 && (
          <span className="flex items-center gap-1 text-xs text-ink-faint">
            <Repeat size={13} className="shrink-0" />
            {process.previousApplications + 1}ª candidatura nesta empresa
          </span>
        ))
      }

      <Badge variant={process.badge.variant} className="mt-2">
        {process.badge.label}
      </Badge>
    </div>
  );
}
