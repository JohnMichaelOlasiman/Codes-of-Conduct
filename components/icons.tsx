import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3 5.5 5.8v5.1c0 4.5 2.7 8.2 6.5 10.1 3.8-1.9 6.5-5.6 6.5-10.1V5.8L12 3Z" />
      <path d="m9.2 12 1.8 1.8 4-4.1" />
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.8 19v-1.6A4.4 4.4 0 0 1 8.2 13h1.6a4.4 4.4 0 0 1 4.4 4.4V19" />
      <path d="M15.5 5.4a3 3 0 0 1 0 5.7M16.5 13.3a4.4 4.4 0 0 1 3.7 4.3V19" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4 4.4-2Z" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M10.3 4.3 2.8 17.1A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.9L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 16.5h.01" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m8 10 4-4 4 4M12 6v12" />
    </svg>
  );
}
