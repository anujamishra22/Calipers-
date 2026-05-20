"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { prefersReducedMotion } from "@/lib/animations";

type Props = {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function MetricCounter({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className,
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const reduce = prefersReducedMotion();

  return (
    <span ref={ref} className={className}>
      {reduce ? (
        <>
          {prefix}
          {end}
          {suffix}
        </>
      ) : inView ? (
        <CountUp
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <>
          {prefix}0{suffix}
        </>
      )}
    </span>
  );
}
