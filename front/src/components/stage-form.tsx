import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { useCreateStage } from "@/hooks/process/use-create-stage";
import { useUpdateStage } from "@/hooks/process/use-update-stage";
import { formatCurrency, toCents } from "@/lib/format/currency";
import {
  type StageExtraField,
  allStageExtraFields,
  stageExtraFields,
  stageStatusOptions,
  stageStatusSlugs,
  stageTypeLabels,
  stageTypeOptions,
  stageTypeSlugs,
} from "@/lib/stage-types";
import type { Stage, StageTypeName } from "@/types/stages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type StageProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  processId: string;
  stage?: Stage | null;
};

const requiredMessages: Record<StageExtraField, string> = {
  challenge: "Descreva o desafio",
  deadline: "Informe o prazo de entrega",
  compensation: "Informe o valor oferecido",
  benefits: "Informe os benefícios",
  respondBy: "Informe até quando responder",
};

const stageFormSchema = z
  .object({
    type: z.enum(stageTypeSlugs),
    status: z.enum(stageStatusSlugs),
    date: z.string().min(1, "Informe a data"),
    challenge: z.string().trim(),
    deadline: z.string(),
    compensation: z.string().trim(),
    benefits: z.string().trim(),
    respondBy: z.string(),
    comment: z.string().trim(),
  })
  .superRefine((values, ctx) => {
    for (const field of stageExtraFields[values.type]) {
      if (!values[field]) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message: requiredMessages[field],
        });
      }
    }
  });

type StageFormValues = z.infer<typeof stageFormSchema>;

function toFormValues(stage?: Stage | null): StageFormValues {
  return {
    type: (stage?.type as StageTypeName) ?? "triagem",
    status: stage?.status ?? "agendada",
    date: stage?.date ? stage.date.slice(0, 10) : "",
    challenge: stage?.challenge ?? "",
    deadline: stage?.deadline ? stage.deadline.slice(0, 10) : "",
    compensation: stage?.compensation ?? "",
    benefits: stage?.benefits ?? "",
    respondBy: stage?.respondBy ? stage.respondBy.slice(0, 10) : "",
    comment: stage?.comment ?? "",
  };
}

function buildStageInput(values: StageFormValues) {
  const base = {
    name: stageTypeLabels[values.type],
    type: values.type,
    status: values.status,
    date: values.date,
    comment: values.comment || undefined,
  };

  if (values.type === "tecnica") {
    return { ...base, challenge: values.challenge, deadline: values.deadline };
  }

  if (values.type === "proposta") {
    return {
      ...base,
      compensation: values.compensation,
      benefits: values.benefits,
      respondBy: values.respondBy,
    };
  }

  return base;
}

export function StageForm({
  open,
  onOpenChange,
  stage,
  processId,
}: StageProps) {
  const { mutate: createStage, isPending, isError } = useCreateStage(processId);
  const updateStage = useUpdateStage(processId);

  const isSaving = isPending || updateStage.isPending;
  const hasError = isError || updateStage.isError;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm<StageFormValues>({
    resolver: zodResolver(stageFormSchema),
    defaultValues: toFormValues(stage),
  });

  const type = watch("type");

  useEffect(() => {
    if (open) reset(toFormValues(stage));
  }, [open, stage, reset]);

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) reset();
  }

  function onSubmit(values: StageFormValues) {
    const onSuccess = () => handleOpenChange(false);

    if (stage) {
      updateStage.mutate(
        {
          id: stage.id,
          input: buildStageInput(values),
        },
        { onSuccess },
      );
      return;
    }

    createStage(buildStageInput(values), { onSuccess });
  }

  function handleTypeChange(next: StageTypeName) {
    setValue("type", next);

    for (const name of allStageExtraFields) {
      setValue(name, "");
    }

    clearErrors(allStageExtraFields);
  }

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title={stage ? "Editar etapa" : "Nova etapa"}
    >
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <SelectField
              id="type"
              label="Tipo"
              value={field.value}
              onValueChange={handleTypeChange}
              options={stageTypeOptions}
            />
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SelectField
              id="status"
              label="Status"
              value={field.value}
              onValueChange={field.onChange}
              options={stageStatusOptions}
            />
          )}
        />

        <Input
          id="date"
          type="date"
          label="Data"
          placeholder="dd/mm/yyyy"
          error={errors.date?.message}
          {...register("date")}
        />

        {type === "tecnica" && (
          <>
            <Input
              id="challenge"
              type="text"
              label="Desafio"
              placeholder="Ex: App de tarefas em React"
              error={errors.challenge?.message}
              {...register("challenge")}
            />

            <Input
              id="deadline"
              type="date"
              label="Prazo de entrega"
              error={errors.deadline?.message}
              {...register("deadline")}
            />
          </>
        )}

        {type === "proposta" && (
          <>
            <Controller
              control={control}
              name="compensation"
              render={({ field }) => (
                <Input
                  id="compensation"
                  type="text"
                  label="Valor oferecido"
                  placeholder="R$ 0,00"
                  error={errors.compensation?.message}
                  {...field}
                  onChange={(event) =>
                    field.onChange(
                      toCents(event.target.value)
                        ? formatCurrency(event.target.value)
                        : "",
                    )
                  }
                />
              )}
            />

            <Input
              id="benefits"
              type="text"
              label="Benefícios"
              placeholder="Ex: VR, plano de saúde"
              error={errors.benefits?.message}
              {...register("benefits")}
            />

            <Input
              id="respondBy"
              type="date"
              label="Responder até"
              error={errors.respondBy?.message}
              {...register("respondBy")}
            />
          </>
        )}

        <Textarea
          id="comment"
          label="Comentário"
          optional
          placeholder="Como foi a conversa, o que ficou combinado..."
          {...register("comment")}
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
            Salvar etapa
          </Button>
        </div>
      </form>
    </Modal>
  );
}
