import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
};

function getPages(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const visible = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const items: (number | "...")[] = [];
  visible.forEach((p, i) => {
    if (i > 0 && p - visible[i - 1]) items.push("...");
    items.push(p);
  });

  return items;
}

export function Pagination({
  onChange,
  page,
  perPage,
  total,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <>
      <hr className="mt-4 mb-4 border border-line" />
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <span className="text-[13px] text-ink-muted">
          {start}–{end} de {total} processos
        </span>

        <nav aria-label="Paginação" className="felx items-center gap-1">
          <Button
            variant="page"
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>

          {getPages(page, totalPages).map((item, i) =>
            item === "..." ? (
              <span key={`gap-${i}`} className="px-1 text-ink-faint">
                ...
              </span>
            ) : (
              <Button
                key={item}
                variant="page"
                active={item === page}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onChange(item)}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            variant="page"
            disabled={page === totalPages}
            onClick={() => onChange(page + 1)}
          >
            Próxima
            <ChevronRight size={16} />
          </Button>
        </nav>
      </div>
    </>
  );
}
