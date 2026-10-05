const cards = [
  { company: 120, role: 200, badge: 132 },
  { company: 96, role: 168, badge: 116 },
  { company: 140, role: 220, badge: 104 },
];

type BarProps = {
  width: number;
  height: number;
  className?: string;
};

function Bar({ width, height, className = "" }: BarProps) {
  return (
    <span
      className={`block bg-line animate-pulse motion-reduce:animate-none ${className}`}
      style={{ width, height }}
    />
  );
}

export function HomeSkeleton() {
  return (
    <output
      className="flex w-full flex-col gap-2"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Carregando processos</span>

      {cards.map((card) => (
        <div
          key={card.company}
          className="flex flex-col gap-0.5 p-5 border-2 border-line rounded-card"
        >
          <div className="flex h-5.5 items-center justify-between gap-3">
            <Bar width={card.company} height={15} className="rounded-sm" />
            <Bar width={88} height={15} className="rounded-sm" />
          </div>

          <div className="flex h-5.25 items-center">
            <Bar width={card.role} height={14} className="rounded-sm" />
          </div>

          <Bar width={card.badge} height={24} className="mt-2 rounded-badge" />
        </div>
      ))}
    </output>
  );
}
