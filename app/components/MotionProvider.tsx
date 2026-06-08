"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every Framer Motion animation honours the user's
 * reduced-motion preference: transform/layout animations are suppressed,
 * opacity fades are kept. Pairs with the reduced-motion CSS in globals.css.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
