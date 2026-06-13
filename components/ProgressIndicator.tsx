type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export default function ProgressIndicator({
  current,
  total,
}: ProgressIndicatorProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div
      className="fixed left-6 right-6 top-5 z-40 flex items-center gap-4 sm:left-10 sm:right-10 lg:left-28 lg:right-10"
      aria-label={`Slide ${current + 1} of ${total}`}
    >
      <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-graphite">
        {String(current + 1).padStart(2, "0")}
      </span>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-rule">
        <div
          className="h-full rounded-full bg-graphite transition-[width] duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-slate">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
