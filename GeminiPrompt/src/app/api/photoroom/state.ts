// Module-level shared state between /api/photoroom (run) and /api/photoroom/control.
// Use globalThis so HMR in dev mode preserves state across module reloads.
type RunState = {
  paused: boolean;
  aborted: boolean;
  running: boolean;
};

const g = globalThis as unknown as { __photoroomRunState?: RunState };
g.__photoroomRunState ??= { paused: false, aborted: false, running: false };

export const runState = g.__photoroomRunState!;

export function resetRunState() {
  runState.paused = false;
  runState.aborted = false;
  runState.running = true;
}

export function endRunState() {
  runState.paused = false;
  runState.aborted = false;
  runState.running = false;
}
