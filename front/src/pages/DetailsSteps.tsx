import { Badge } from "@/components/badge";
import { ConfirmModal } from "@/components/confirm-modal";
import { DetailsSkeleton } from "@/components/details-skeleton";
import { ProcessForm } from "@/components/process-form";
import { StageForm } from "@/components/stage-form";
import { StageTimeline } from "@/components/stage-timeline";
import { Button } from "@/components/ui/button";
import { useDeleteStage } from "@/hooks/process/use-delete-stage";
import { useFindProcesses } from "@/hooks/process/use-find-process";
import { useProcessHistory } from "@/hooks/process/use-process-history";
import { useStages } from "@/hooks/process/use-stages";
import { formatDate, formatMonthYear } from "@/lib/format/date";
import { expectationIcons } from "@/lib/icons";
import type { Stage } from "@/types/stages";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  History,
  MessageSquare,
  Pencil,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";

export function DetailsSteps() {
  const { id } = useParams();
  const { data: processData, isLoading, isError } = useFindProcesses(id);

  const process = processData?.process;

  const { data } = useProcessHistory(id);
  const histories = data?.history ?? [];

  const { data: stagesData } = useStages(process?.id);
  const deleteStage = useDeleteStage(process?.id);

  const [open, setOpen] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [stageDelete, setStageDelete] = useState<Stage | null>(null);
  const [selected, setSelected] = useState<Stage | null>(null);

  if (isError) return <Navigate to="/" replace />;

  const stages = stagesData?.stages ?? [];

  const expectation = process?.expectation
    ? expectationIcons[process.expectation]
    : null;

  function handleCloseModal() {
    setOpen(false);
  }

  function handleCloseModalConfirm() {
    setOpenConfirm(false);
    setStageDelete(null);
  }

  function handleOpenModalConfirm(stage: Stage) {
    setOpenConfirm(true);
    setStageDelete(stage);
  }

  function handleNew() {
    setSelected(null);
    setOpen(true);
  }

  function handleEdit(stage: Stage) {
    setSelected(stage);
    setOpen(true);
  }

  function handleConfirmOk() {
    if (stageDelete === null) return;

    deleteStage.mutate(
      {
        id: stageDelete.id,
      },
      { onSuccess: handleCloseModalConfirm },
    );
  }

  return (
    <>
      <section className="mx-auto flex flex-col items-center justify-between">
        <div className="mx-auto flex flex-1 justify-between w-full">
          <Link
            to="/"
            className={`flex flex-row text-ink-muted hover:text-ink-faint
             text-[16px] font-normal gap-1.25 items-center cursor-pointer`}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Link>

          <Button onClick={handleNew} disabled={isLoading}>
            <Plus size={15} />
            Adicionar etapa
          </Button>
        </div>

        <div
          className={`mt-5 flex flex-col w-full items-center justify-center p-6
                  rounded-card border border-line bg-surface`}
        >
          {isLoading || !process ? (
            <DetailsSkeleton />
          ) : (
            <>
              <div className="flex mx-auto flex-row items-center gap-2 w-full justify-between">
                <div className="flex flex-row items-center w-full gap-2">
                  <h1 className="text-[20px] font-semibold">
                    {process.company}
                  </h1>
                  {expectation && (
                    <expectation.icon
                      size={20}
                      className={`shrink-0 ${expectation.className}`}
                    />
                  )}
                </div>
                <Button
                  variant="icon"
                  aria-label="Editar"
                  onClick={() => setOpenProcess(true)}
                >
                  <Pencil size={20} />
                </Button>
              </div>

              <div className="mx-auto flex flex-col mt-0.5 w-full">
                <p className="text-[14px] font-normal text-ink-muted first-letter:uppercase">
                  {process.role}
                </p>

                <div className="flex flex-row gap-1.5 items-center mt-2">
                  <Calendar size={15} className="shrink-0 text-ink" />
                  <p className="text-ink-muted text-[13px]">
                    Candidatura em {formatDate(process.date)}
                  </p>
                  {process.jobUrl && (
                    <a
                      href={process.jobUrl}
                      target="_blank"
                      className="flex items-center gap-1 text-[13px] text-accent hover:underline"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} />
                      Ver vaga
                    </a>
                  )}
                </div>

                {process.note && (
                  <div className="flex flex-row items-center gap-1.5 mt-3">
                    <MessageSquare size={15} className="shrink-0 text-ink" />
                    <p className="text-ink-muted text-[13px]">{process.note}</p>
                  </div>
                )}
              </div>

              <Badge variant={process.badge.variant} className="mt-5 w-full">
                {process.badge.label}
              </Badge>

              {stages && stages.length > 0 ? (
                <div className="flex flex-col w-full mt-5">
                  <StageTimeline
                    stages={stages}
                    onEdit={handleEdit}
                    onDelete={handleOpenModalConfirm}
                  />

                  <div className="flex w-full justify-end mt-5">
                    <Button
                      variant="secondary"
                      onClick={handleNew}
                      disabled={isLoading}
                    >
                      <Plus size={15} />
                      Adicionar etapa
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`mt-5 flex w-full items-center justify-center p-6
                  rounded-card border border-line bg-surface`}
                >
                  <div
                    className={`flex flex-col pt-10 pb-10 pr-4 pl-4 items-center 
                          justify-center text-ink-faint`}
                  >
                    <span className="text-[18px] font-medium pt-3 text-ink">
                      Nenhuma etapa registrada
                    </span>

                    <span className="text-[16px] font-normal pt-1 text-ink-muted">
                      Quando tiver triagem, entrevista ou proposta, registre
                      aqui.
                    </span>

                    <Button className="mt-4" onClick={handleNew}>
                      <Plus size={15} />
                      Nova etapa
                    </Button>
                  </div>
                </div>
              )}

              {histories && histories.length > 0 && (
                <>
                  <hr className="w-full border border-line mt-5 mb-3" />
                  <div className="flex flex-col w-full">
                    <span className="text-[14px] font-medium flex flex-row items-center gap-2 text-ink-muted">
                      <History size={14} />
                      Histórico nesta empresa · {histories.length}{" "}
                      {histories.length === 1 ? "candidatura" : "candidaturas"}
                    </span>

                    <div className="flex flex-col w-full mt-4.5 gap-4">
                      {histories.map((history) => (
                        <div
                          key={`history-${history.id}`}
                          className="flex flex-col w-full gap-2 border-b border-surface-2 py-2 last:border-b-0"
                        >
                          <div className="flex flex-row justify-between items-center">
                            <span className="text-[13px] text-ink font-normal first-letter:uppercase">
                              {history.role}
                            </span>
                            <span className="text-[12px] font-normal text-ink-faint">
                              {history.result}
                            </span>
                          </div>

                          <span className="text-[12px] font-normal text-ink-faint">
                            candidatura em {formatMonthYear(history.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {id && (
        <>
          <StageForm
            open={open}
            onOpenChange={handleCloseModal}
            processId={id}
            stage={selected}
          />

          <ProcessForm
            open={openProcess}
            onOpenChange={() => setOpenProcess(false)}
            process={process}
          />
        </>
      )}

      <ConfirmModal
        open={openConfirm}
        title="Excluir etapa"
        message={`Deseja excluir a etapa "${stageDelete?.name}"?`}
        labelButton="Excluir etapa"
        isLoading={deleteStage.isPending}
        isError={deleteStage.isError}
        onOpenChange={handleCloseModalConfirm}
        onConfirmChange={handleConfirmOk}
      />
    </>
  );
}
