export function fromCents(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function toCents(value: string) {
  return Number(value.replace(/\D/g, ""));
}

export function formatCurrency(raw: string) {
  return fromCents(toCents(raw));
}
