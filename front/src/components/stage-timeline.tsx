import { StageItem } from "@/components/stage-item";
import type { Stage } from "@/types/stages";

type StageTimelineProps = {
  stages: Stage[];
  onEdit(stage: Stage): void;
  onDelete(stage: Stage): void;
};

export function StageTimeline({
  stages,
  onEdit,
  onDelete,
}: StageTimelineProps) {
  return (
    <ol className="relative flex flex-col w-full gap-5">
      <span className="absolute left-1 top-2 bottom-2 w-px bg-line" />
      {stages.map((stage, index) => (
        <StageItem
          key={stage.id}
          stage={stage}
          current={index === 0}
          onEdit={() => onEdit(stage)}
          onDelete={() => onDelete(stage)}
        />
      ))}
    </ol>
  );
}
