import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { expectationOptions } from "@/lib/expectation-options";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { useCreateProcess } from "@/hooks/process/use-create-process";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Process } from "@/types/process";
import { useEffect } from "react";
import { useUpdateProcess } from "@/hooks/process/use-update-process";

type ProcessProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  process?: Process | null;
};

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const processFormSchema = z.object({
  company: z.string().trim().min(1, "Informe o nome da empresa"),
  role: z.string().trim().min(1, "Informe a vaga"),
  jobUrl: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" || z.httpUrl().safeParse(withProtocol(value)).success,
      "Informe um link válido, ex: vagas.com/123",
    ),
  date: z.string().min(1, "Informe a data em que você se candidatou"),
  expectation: z.enum(["neutro", "sonho", "gosto muito"]),
  note: z.string().trim(),
});

type ProcessFormValues = z.infer<typeof processFormSchema>;

function toFormValues(process?: Process | null): ProcessFormValues {
  return {
    company: process?.company ?? "",
    role: process?.role ?? "",
    jobUrl: process?.jobUrl ?? "",
    date: process?.date ? process.date.slice(0, 10) : "",
    expectation: process?.expectation ?? "neutro",
    note: process?.note ?? "",
  };
}

export function ProcessForm({ open, onOpenChange, process }: ProcessProps) {
  const { mutate: createProcess, isPending, isError } = useCreateProcess();
  const updateProcess = useUpdateProcess();

  const isSaving = isPending || updateProcess.isPending;
  const hasError = isError || updateProcess.isError;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProcessFormValues>({
    resolver: zodResolver(processFormSchema),
    defaultValues: toFormValues(process),
  });

  useEffect(() => {
    if (open) reset(toFormValues(process));
  }, [open, process, reset]);

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) reset();
  }

  function onSubmit(values: ProcessFormValues) {
    const onSuccess = () => handleOpenChange(false);

    if (process) {
      updateProcess.mutate(
        {
          id: process.id,
          input: {
            company: values.company,
            role: values.role,
            date: values.date,
            jobUrl: values.jobUrl || null,
            expectation:
              values.expectation === "neutro" ? null : values.expectation,
            note: values.note,
          },
        },
        { onSuccess },
      );
      return;
    }

    createProcess(
      {
        company: values.company,
        role: values.role,
        date: values.date,
        jobUrl: values.jobUrl || undefined,
        expectation:
          values.expectation === "neutro" ? undefined : values.expectation,
        note: values.note || undefined,
      },
      { onSuccess },
    );
  }

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title={process ? "Editar processo" : "Novo processo"}
    >
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="company"
          type="text"
          label="Empresa"
          placeholder="Nome da empresa"
          error={errors.company?.message}
          {...register("company")}
        />

        <Input
          id="role"
          type="text"
          label="Descrição da vaga"
          placeholder="Ex: Vaga de analista"
          error={errors.role?.message}
          {...register("role")}
        />

        <Input
          id="jobUrl"
          type="url"
          label="Link da vaga"
          placeholder="https://"
          optional
          error={errors.jobUrl?.message}
          {...register("jobUrl")}
        />

        <Input
          id="date"
          type="date"
          label="Data em que você se candidatou"
          error={errors.date?.message}
          {...register("date")}
        />

        <Controller
          control={control}
          name="expectation"
          render={({ field }) => (
            <SelectField
              id="expectation"
              label="Expectativa"
              optional
              value={field.value}
              onValueChange={field.onChange}
              options={expectationOptions}
            />
          )}
        />

        <Textarea
          id="note"
          label="Observação"
          optional
          placeholder="Quem te entrevistou, como foi o contato..."
          {...register("note")}
        />

        {hasError && (
          <span className="text-xs text-danger">
            Não foi possível salvar. Tente de novo.
          </span>
        )}

        <hr className="border border-line " />
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            type="submit"
            isLoading={isSaving}
            disabled={isSaving}
          >
            Salvar processo
          </Button>
        </div>
      </form>
    </Modal>
  );
}
