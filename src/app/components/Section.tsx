import { type HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement>;

export default function Section({ className = "", ...props }: SectionProps) {
  return <section className={className} {...props} />;
}
