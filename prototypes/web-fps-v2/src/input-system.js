import { getMouseLookScale } from "./settings-system.js";

export function bindPointerLook({ canvas, state, settings }) {
  canvas.addEventListener("click", () => {
    if (state.mode !== "running") return;
    if (state.storyPanel) return;
    canvas.requestPointerLock?.();
  });

  document.addEventListener("pointerlockchange", () => {
    state.pointerLocked = document.pointerLockElement === canvas;
    if (state.pointerLocked) {
      state.message = "Mouse look active.";
    } else if (state.mode === "running" && !state.storyPanel) {
      state.message = "Click the game to re-enable mouse look.";
    }
  });

  document.addEventListener("mousemove", (event) => {
    if (document.pointerLockElement !== canvas) return;
    if (state.mode !== "running") return;
    if (state.storyPanel) return;
    state.player.angle += event.movementX * getMouseLookScale(settings);
  });
}

export function isActionBlocked(state) {
  return Boolean(state.storyPanel) || state.mode !== "running";
}
