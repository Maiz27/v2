// True from the moment navigation commits under the panel until the reveal
// finishes. Plain module state because any reader is a client component. Kept
// as a seam for a future page-entrance hold, mirroring the reference.
let entering = false;

export function setRouteTransitionEntering(value: boolean) {
  entering = value;
}

export function isRouteTransitionEntering() {
  return entering;
}
