export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function formatMonthYear(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDayMonth(value: string) {
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "UTC",
  });
}
