"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 100, className = "" }: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className={`animate-slide-up ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ animationDelay: `${i * staggerDelay}ms`, animationFillMode: "both" }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}