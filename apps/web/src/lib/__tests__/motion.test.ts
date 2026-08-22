import { describe, expect, it } from 'vitest';
import {
  INITIAL_MOTION_STATE,
  RESPECT_REDUCED_MOTION,
  resolveMotion,
} from '@/lib/motion';

describe('resolveMotion', () => {
  it('keeps motion on while the reduced-motion gate is open', () => {
    expect(RESPECT_REDUCED_MOTION).toBe(false);
    expect(resolveMotion(false)).toBe('on');
    expect(resolveMotion(true)).toBe('on');
  });

  it('uses the same open-gate state for the server default', () => {
    expect(INITIAL_MOTION_STATE).toBe('on');
  });
});
