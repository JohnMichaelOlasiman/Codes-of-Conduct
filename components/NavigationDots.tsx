type NavigationDotsProps = {
  current: number;
  labels: string[];
  onSelect: (index: number) => void;
};

export default function NavigationDots({
  current,
  labels,
  onSelect,
}: NavigationDotsProps) {
  return (
    <nav
      aria-label="Presentation slides"
      className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-rule bg-white/85 p-1.5 shadow-float backdrop-blur-md sm:flex"
    >
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(index)}
          className="group relative grid h-7 place-items-center rounded-full px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-graphite"
          aria-label={`Go to slide ${index + 1}: ${label}`}
          aria-current={current === index ? "step" : undefined}
        >
          <span className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-graphite px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white opacity-0 shadow-float transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              current === index
                ? "h-2.5 w-6 bg-graphite"
                : "h-2 w-2 bg-rule group-hover:bg-slate"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
