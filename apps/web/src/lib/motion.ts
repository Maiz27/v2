/**
 * ============================================================================
 * MOTION GATE. Read this before touching any animation on the site.
 * ============================================================================
 *
 * Maged's machine has `prefers-reduced-motion` forced ON at the OS level, but
 * while we iterate on V3 he has to actually SEE the motion to judge it. If we
 * honored the OS setting the way we normally would, every animation would be
 * dead on his screen and we could never review it.
 *
 * So ALL motion is routed through this one gate. Nothing reads
 * `@media (prefers-reduced-motion)` directly, and nothing calls framer-motion's
 * `useReducedMotion()` directly. Everything keys off the `data-motion`
 * attribute that <MotionGate> stamps on the document root from the value below.
 *
 * When we want to honor the OS setting again, flipping THIS ONE CONSTANT to
 * `true` is the only change needed: the resolver below will then defer to
 * `prefers-reduced-motion`, MotionGate will set `data-motion="off"` for users
 * who asked for less motion, and the CSS / framer gates all fall in line.
 *
 *   false  ->  motion always plays, OS setting ignored (current: we iterate)
 *   true   ->  motion respects the visitor's prefers-reduced-motion (ship)
 */
export const RESPECT_REDUCED_MOTION = false;

export type MotionState = 'on' | 'off';

/**
 * Resolve the effective motion state from the gate and the visitor's OS
 * preference. The single place the gate constant is consulted.
 */
export function resolveMotion(prefersReducedMotion: boolean): MotionState {
  if (!RESPECT_REDUCED_MOTION) return 'on';
  return prefersReducedMotion ? 'off' : 'on';
}

/**
 * SSR default for the document root `data-motion` attribute. Rendered on the
 * server (where the OS preference is unknown) so the first paint already has
 * the right value while the gate is open; <MotionGate> re-resolves on mount
 * once the gate is flipped and the OS preference becomes readable.
 */
export const INITIAL_MOTION_STATE: MotionState = RESPECT_REDUCED_MOTION
  ? 'off'
  : 'on';
