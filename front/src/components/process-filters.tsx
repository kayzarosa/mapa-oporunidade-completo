import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectField } from "@/components/ui/select-field";
import {
  type StageTypeName,
  type StagesStatus,
  stageStatusLabels,
  stageStatusOptions,
  stageTypeLabels,
  stageTypeOptions,
} from "@/lib/stage-types";
import { ListFilter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export type Filters = {
  status: StagesStatus | "todos";
  type: StageTypeName | "todos";
  expiring: boolean;
};

export const emptyFilters: Filters = {
  status: "todos",
  type: "todos",
  expiring: false,
};

type ProcessFiltersProps = {
  search: string;
  filters: Filters;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: Filters) => void;
};

const statusOptions = [
  { value: "todos" as const, label: "Todos" },
  ...stageStatusOptions,
];
const typeOptions = [
  { value: "todos" as const, label: "Todos" },
  ...stageTypeOptions,
];

export function ProcessFilters({
  search,
  filters,
  onSearchChange,
  onFiltersChange,
}: ProcessFiltersProps) {
  const [text, setText] = useState(search);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(text), 300);
    return () => clearTimeout(timer);
  }, [text, onSearchChange]);

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  function handleApply() {
    onFiltersChange(draft);
    setOpen(false);
  }

  function handleClear() {
    setDraft(emptyFilters);
    onFiltersChange(emptyFilters);
    setOpen(false);
  }

  const chips = [
    filters.status !== "todos" && {
      key: "status",
      label: `Status: ${stageStatusLabels[filters.status]}`,
      remove: () => onFiltersChange({ ...filters, status: "todos" }),
    },
    filters.type !== "todos" && {
      key: "type",
      label: `Tipo: ${stageTypeLabels[filters.type]}`,
      remove: () => onFiltersChange({ ...filters, type: "todos" }),
    },
    filters.expiring && {
      key: "expiring",
      label: "Prazo vencendo",
      remove: () => onFiltersChange({ ...filters, expiring: false }),
    },
  ].filter((chip) => chip !== false);

  return (
    <div className="mt-5 flex w-full flex-col gap-3">
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Input
            id="search"
            label="Buscar por empresa"
            hideLabel
            icon={<Search size={16} />}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Buscar por empresa"
            className="min-w-0 flex-1"
          />
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              className={
                chips.length > 0
                  ? "border-accent bg-accent-soft text-accent"
                  : ""
              }
            >
              <ListFilter size={16} />
              Filtros
              {chips.length > 0 && (
                <span className="flex size-5 items-center justify-center rounded-full bg-accent text-xs text-surface">
                  {chips.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col gap-4">
            <SelectField
              id="filter-status"
              label="Status da última etapa"
              options={statusOptions}
              value={draft.status}
              onValueChange={(status) => setDraft({ ...draft, status })}
            />
            <SelectField
              id="filter-type"
              label="Tipo da última etapa"
              options={typeOptions}
              value={draft.type}
              onValueChange={(type) => setDraft({ ...draft, type })}
            />
            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={draft.expiring}
                onChange={(event) =>
                  setDraft({ ...draft, expiring: event.target.checked })
                }
                className="mt-1 accent-accent"
              />
              <span className="flex flex-col">
                <span className="text-[14px] font-medium text-ink">
                  Com prazo vencendo
                </span>
                <span className="text-xs text-ink-faint">
                  Desafio ou resposta nos próximos 3 dias
                </span>
              </span>
            </label>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleClear}>
                Limpar
              </Button>
              <Button onClick={handleApply}>Aplicar</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1 rounded-control bg-accent-soft
                         px-2 py-1 text-xs font-medium text-accent"
            >
              {chip.label}
              <Button
                variant="icon"
                aria-label={`Remover ${chip.label}`}
                onClick={chip.remove}
                className="p-0.5"
              >
                <X size={12} />
              </Button>
            </span>
          ))}

          <Button
            variant="icon"
            className="px-2 text-sm font-medium text-accent"
            onClick={() => onFiltersChange(emptyFilters)}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
