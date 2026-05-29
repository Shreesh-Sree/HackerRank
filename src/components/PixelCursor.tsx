"use client";

import { useEffect, useRef } from "react";
import $ from "jquery";

export default function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 768) return;

    const $cursor = $(cursorRef.current!);
    $cursor.show();

    const dots: JQuery<HTMLElement>[] = [];
    const maxDots = 8;

    const onMouseMove = (e: MouseEvent) => {
      // Move primary pixel cursor
      $cursor.css({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
      });

      // Spawn trail particle
      const $dot = $('<div class="cursor-dot"></div>');
      $dot.css({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: "0.8",
      });
      $("body").append($dot);
      dots.push($dot);

      // Animate particle drift and fade
      $dot.animate(
        {
          top: `+=10`,
          opacity: 0,
        },
        {
          duration: 350,
          complete: () => {
            $dot.remove();
            const index = dots.indexOf($dot);
            if (index > -1) {
              dots.splice(index, 1);
            }
          },
        }
      );

      // Enforce trail limit
      if (dots.length > maxDots) {
        const oldest = dots.shift();
        if (oldest) oldest.remove();
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      $cursor.hide();
      dots.forEach((d) => d.remove());
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
