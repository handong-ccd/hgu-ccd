"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { MOTION } from "@/components/motion/motion";
import "./exhibition-poster.css";

/**
 * 전시 상세 포스터 — 화면에 들어오고 이미지가 로드되면
 * 틀은 작게 잘린 상태에서 커지고(zoom in), 이미지는 확대된 상태에서 원래 크기로(zoom out) 등장 (Figma 486:1363)
 */
export function ExhibitionPoster({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  const visible = useRef(false);

  const reveal = () => {
    if (loaded.current && visible.current && ref.current) ref.current.dataset.revealState = "revealing";
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // 하이드레이션 전에 이미 로드된 이미지
    if (el.querySelector("img")?.complete) loaded.current = true;
    if (!("IntersectionObserver" in window)) {
      el.dataset.revealState = "revealing";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        visible.current = true;
        reveal();
        io.disconnect();
      },
      { threshold: MOTION.revealThreshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal-state="waiting"
      className={`exhibition-poster relative ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div className="exhibition-poster-frame absolute inset-0 overflow-hidden bg-neutral-900">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="exhibition-poster-image object-cover"
          onLoad={() => {
            loaded.current = true;
            reveal();
          }}
        />
      </div>
      <noscript>
        <style>{".exhibition-poster-frame{clip-path:none!important}.exhibition-poster-image{transform:none!important}"}</style>
      </noscript>
    </div>
  );
}
