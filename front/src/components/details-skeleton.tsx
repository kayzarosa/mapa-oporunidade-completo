export function DetailsSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col" aria-busy="true">
      <div className="h-5 w-36 rounded-badge bg-line" />
      <div className="mt-2 h-3.5 w-56 rounded-badge bg-line" />
      <div className="mt-2 h-3 w-44 rounded-badge bg-line" />

      <hr className="my-5 border-line" />

      {[0, 1].map((item) => (
        <div key={item} className="mb-4 flex gap-3">
          <div className="mt-1 size-2 shrink-0 rounded-full bg-line" />
          <div className="flex w-full flex-col gap-2">
            <div className="h-3 w-20 rounded-badge bg-line" />
            <div className="h-3 w-3/4 rounded-badge bg-line" />
          </div>
        </div>
      ))}
    </div>
  );
}
