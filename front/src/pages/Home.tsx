import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardProcess } from "@/components/card-process";
import { ProcessForm } from "@/components/process-form";
import { useState } from "react";
import { useProcesses } from "@/hooks/process/use-processes";

export function Home() {
  const { data, isLoading } = useProcesses();

  const processes = data?.process ?? [];

  const [open, setOpen] = useState(false);

  function handleCloseModal() {
    setOpen(!open);
  }

  return (
    <>
      <section className="mx-auto flex flex-col items-center justify-between">
        <div className="mx-auto flex flex-1 justify-between w-full">
          <h1 className="text-[24px] text-ink font-semibold">Meus processos</h1>

          <Button onClick={handleCloseModal}>
            <Plus size={15} />
            Novo
          </Button>
        </div>

        <div
          className={`mt-5 flex w-full items-center justify-center p-6
                  rounded-card border border-line bg-surface`}
        >
          {!isLoading && processes.length === 0 && (
            <div
              className={`flex flex-col pt-10 pb-10 pr-4 pl-4 items-center 
                          justify-center text-ink-faint`}
            >
              <Briefcase size={28} />

              <span className="text-[18px] font-normal pt-3 text-ink">
                Comece pelo primeiro processo
              </span>

              <span className="text-[16px] font-normal pt-1 text-ink-muted">
                Cadastre uma empresa e a vaga que você está tentando
              </span>

              <Button className="mt-4" onClick={handleCloseModal}>
                <Plus size={15} />
                Novo processo
              </Button>
            </div>
          )}

          {processes.length > 0 && (
            <div className="flex flex-col w-full gap-2 max-h-[72dvh] overflow-y-auto">
              {processes.map((process) => (
                <CardProcess key={process.id} process={process} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProcessForm open={open} onOpenChange={handleCloseModal} />
    </>
  );
}
