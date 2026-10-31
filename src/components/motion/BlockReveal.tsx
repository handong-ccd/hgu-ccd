"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { MOTION, REDUCED_MOTION } from "./motion";
import "./block-reveal.css";

/**
 * 교수 상세 CV 섹션(블록) 등장 — start 가 되면 블록마다 blockStagger 만큼 늦게
 * 안쪽 .faculty-reveal-item 이 한 줄씩 아래에서 올라오고 .faculty-section-rule 선이 그어짐 (Figma 486:1365)
 */
export function BlockReveal({ children, index, start }: { children: ReactNode; index: number; start: boolean }) {
  const completed = useRef(false);
  const [state, setState] = useState<"pending" | "waiting" | "revealing" | "revealed">("pending");

  useEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION);

    const sync = () => {
      if (completed.current) return;
      if (reducedMotion.matches) {
        completed.current = true;
        setState("revealed");
        return;
      }
      setState(start ? "revealing" : "waiting");
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
    };
  }, [start]);

  const style = {
    "--reveal-duration": `${MOTION.revealDuration}ms`,
    "--reveal-delay": `${index * MOTION.blockStagger}ms`,
    "--reveal-easing": MOTION.revealEasing,
  } as CSSProperties;

  return (
    <div data-reveal={state === "pending" ? "pending" : "block"} data-block-reveal-state={state} style={style}>
      <div
        className="block-reveal-content"
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget || event.animationName !== "faculty-reveal-complete") return;
          completed.current = true;
          setState("revealed");
        }}
      >
        {children}
      </div>
    </div>
  );
}
