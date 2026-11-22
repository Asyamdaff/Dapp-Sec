import type { CSSProperties, ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Reusable reveal wrapper controlled by the global ScrollReveal observer. */
export default function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  className = "",
}: Props) {
  return (
    <Tag
      style={
        delay
          ? ({ transitionDelay: `${delay}ms` } as CSSProperties)
          : undefined
      }
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}