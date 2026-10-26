import { CardProcess } from "@/components/card-process";
import { ConfirmModal } from "@/components/confirm-modal";
import { HomeSkeleton } from "@/components/home-skeleton";
import { Pagination } from "@/components/pagination";
import { emptyFilters, ProcessFilters, type Filters } from "@/components/process-filters";
import { ProcessForm } from "@/components/process-form";
import { Button } from "@/components/ui/button";
import { useDeleteProcess } from "@/hooks/process/use-delete-process";
import { useProcesses } from "@/hooks/process/use-processes";
import type { Process, ProcessListItem } from "@/types/process";
import { Briefcase, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

export function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const { data, isLoading } = useProcesses({
    page,
    company: search,
    ...filters,
  });
  const deleteProcess = useDeleteProcess();
  const navigate = useNavigate();

  const processes = data?.process ?? [];

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [processDelete, setProcessDelete] = useState<Process | null>(null);
  const [selected, setSelected] = useState<Process | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  function handleFiltersChange(next: Filters) {
    setFilters(next);
    setPage(1);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function handleChangePage(page: number) {
    setPage(page);
  }

  function handleCloseModalConfirm() {
    setOpenConfirm(false);
    setProcessDelete(null);
  }

  function handleOpenModalConfirm(process: Process) {
    setOpenConfirm(true);
    setProcessDelete(process);
  }

  function handleNew() {
    setSelected(null);
    setOpen(true);
  }

  function handleEdit(process: Process) {
    setSelected(process);
    setOpen(true);
  }

  function handleConfirmOk() {
    if (processDelete === null) return;

    deleteProcess.mutate(
      {
        id: processDelete.id,
      },
      { onSuccess: handleCloseModalConfirm },
    );
  }

  function handleShow(process: ProcessListItem) {
    navigate(`/processos/${process.id}`);
  }

  return (
    <>
      <section className="mx-auto flex flex-col items-center justify-between">
        <div className="mx-auto flex flex-1 justify-between w-full">
          <h1 className="text-[24px] text-ink font-semibold">Meus processos</h1>

          <Button onClick={handleNew}>
            <Plus size={15} />
            Novo processo
          </Button>
        </div>

        <ProcessFilters
          search={search}
          filters={filters}
          onSearchChange={handleSearchChange}
          onFiltersChange={handleFiltersChange}
        />
        <div
          className={`mt-5 flex w-full items-center justify-center p-6
                  rounded-card border border-line bg-surface`}
        >
          {isLoading ? (
            <HomeSkeleton />
          ) : (
            <>
              {!isLoading && processes.length === 0 && (
                <div
                  className={`flex flex-col pt-10 pb-10 pr-4 pl-4 items-center 
                          justify-center text-ink-faint`}
                >
                  <Briefcase size={28} />

                  <span className="text-[18px] font-medium pt-3 text-ink">
                    Comece pelo primeiro processo
                  </span>

                  <span className="text-[16px] font-normal pt-1 text-ink-muted">
                    Cadastre uma empresa e a vaga que você está tentando
                  </span>

                  <Button className="mt-4" onClick={handleNew}>
                    <Plus size={15} />
                    Novo processo
                  </Button>
                </div>
              )}

              {processes.length > 0 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full gap-2 max-h-[72dvh] overflow-y-auto">
                    {processes.map((process) => (
                      <CardProcess
                        key={process.id}
                        process={process}
                        onEdit={handleEdit}
                        onDelete={handleOpenModalConfirm}
                        onShow={handleShow}
                      />
                    ))}
                  </div>
                  {data && (
                    <Pagination
                      onChange={handleChangePage}
                      page={data.page}
                      totalPages={data.totalPages}
                      total={data.total}
                      perPage={data.perPage}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ProcessForm
        open={open}
        onOpenChange={handleCloseModal}
        process={selected}
      />

      <ConfirmModal
        open={openConfirm}
        onOpenChange={handleCloseModalConfirm}
        onConfirmChange={handleConfirmOk}
        isLoading={deleteProcess.isPending}
        isError={deleteProcess.isError}
        title="Excluir processo"
        message={`O processo da ${processDelete?.company} e 
        todas as etapas dele serão apagadas. Essa ação não pode ser desfeita.`}
        labelButton="Excluir processo"
      />
    </>
  );
}
