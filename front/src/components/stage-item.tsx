import { ControlButtons } from "@/components/control-button";
import { formatDate, formatDayMonth } from "@/lib/format/date";
import { stageStatusLabels, stageTypeLabels } from "@/lib/stage-types";
import type { Stage, StageTypeName } from "@/types/stages";

type StageItemProps = {
  stage: Stage;
  current: boolean;
  onEdit(stage: Stage): void;
  onDelete(stage: Stage): void;
};

type FieldProps = {
  label: string;
  value: string | null;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="flex gap-4">
      <dt className="w-32 shrink-0 text-ink-faint">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

export function StageItem({
  stage,
  current,
  onEdit,
  onDelete,
}: StageItemProps) {
  const type = stage.type as StageTypeName;

  return (
    <li className="relative pl-6">
      <span
        className={`absolute left-0 top-1.5 size-2 rounded-full ${
          current ? "bg-accent" : "bg-line"
        }`}
      />

      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-ink">
          {stageTypeLabels[type]}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-ink-faint">
            {formatDayMonth(stage.date)}
          </span>
          <ControlButtons
            onEdit={() => onEdit(stage)}
            onDelete={() => onDelete(stage)}
          />
        </div>
      </div>

      <p className="mt-0.5 text-[14px] text-ink-muted">
        {stageStatusLabels[stage.status]}
        {stage.comment && ` · ${stage.comment}`}
      </p>

      {type === "tecnica" && (
        <dl className="mt-2 flex flex-col gap-1 text-[13px]">
          <Field label="Desafio" value={stage.challenge} />
          <Field
            label="Prazo de entrega"
            value={stage.deadline && formatDate(stage.deadline)}
          />
        </dl>
      )}

      {type === "proposta" && (
        <dl className="mt-2 flex flex-col gap-1 text-[13px]">
          <Field label="Valor oferecido" value={stage.compensation} />
          <Field label="Benefícios" value={stage.benefits} />
          <Field
            label="Responder até"
            value={stage.respondBy && formatDate(stage.respondBy)}
          />
        </dl>
      )}
    </li>
  );
}
