import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * 콘텐츠 최대 1579px.
 * 1699px 이상: 좌우 여백이 늘어남 (1920 기준 170px)
 * 768~1699px: 좌우 여백 60px 고정, 콘텐츠 너비가 줄어듦
 * 768px 미만: 모바일 여백 16px
 */
export function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={`mx-auto w-full max-w-[calc(var(--container-content)+120px)] px-4 md:px-[60px] ${className}`}
      {...props}
    />
  );
}
