"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register React plugin
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };

/**
 * Standard GSAP staggered entrance animation for hero headers
 */
export function animateHeroEntrance(scope: React.RefObject<HTMLElement | null>) {
  if (!scope.current) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    scope.current.querySelectorAll(".gsap-badge"),
    { opacity: 0, y: -16 },
    { opacity: 1, y: 0, duration: 0.6 }
  )
    .fromTo(
      scope.current.querySelectorAll(".gsap-headline"),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 },
      "-=0.3"
    )
    .fromTo(
      scope.current.querySelectorAll(".gsap-subtext"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    )
    .fromTo(
      scope.current.querySelectorAll(".gsap-cta"),
      { opacity: 0, y: 16, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
      "-=0.4"
    )
    .fromTo(
      scope.current.querySelectorAll(".gsap-3d"),
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
      "-=0.8"
    );

  return tl;
}

/**
 * Staggered grid cards entrance
 */
export function animateGridCards(container: HTMLElement | null, cardSelector = ".gsap-card") {
  if (!container) return;

  gsap.fromTo(
    container.querySelectorAll(cardSelector),
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
    }
  );
}

