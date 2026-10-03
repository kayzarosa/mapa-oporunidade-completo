import { Badge } from "@/components/badge";
import { DetailsSkeleton } from "@/components/details-skeleton";
import { Button } from "@/components/ui/button";
import { useFindProcesses } from "@/hooks/process/use-find-process";
import { useProcessHistory } from "@/hooks/process/use-process-history";
import { formatDate, formatMonthYear } from "@/lib/format/date";
import { expectationIcons } from "@/lib/icons";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  History,
  MessageSquare,
  Pencil,
  Plus,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router";

export function DetailsSteps() {
  const { id } = useParams();
  const { data: processData, isLoading, isError } = useFindProcesses(id);

  const process = processData?.process;

  const { data } = useProcessHistory(id);
  const histories = data?.history ?? [];

  if (isError) return <Navigate to="/" replace />;

  const expectation = process?.expectation
    ? expectationIcons[process.expectation]
    : null;

  return (
    <>
      <section className="mx-auto flex flex-col items-center justify-between">
        <div className="mx-auto flex flex-1 justify-between w-full">
          <Link
            to={`/`}
            className={`flex flex-row text-ink-muted hover:text-ink-faint
             text-[16px] font-normal gap-1.25 items-center cursor-pointer`}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Link>

          <Button onClick={() => console.log("teste")} disabled={isLoading}>
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
              <div
                className={`flex mx-auto flex-row items-center gap-2 w-full justify-between`}
              >
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
                  onClick={() => console.log("f")}
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

              <div></div>

              <hr className="w-full border border-line mt-5 mb-3" />

              {histories && histories.length > 0 && (
                <>
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
                  <hr className="w-full border border-line mt-3 mb-4" />
                </>
              )}
            </>
          )}

          <div className="flex w-full">
            <Button
              variant="secondary"
              onClick={() => console.log("teste")}
              disabled={isLoading}
            >
              <Plus size={15} />
              Adicionar etapa
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
