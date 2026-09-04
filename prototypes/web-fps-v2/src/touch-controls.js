const ACTIVE_CLASS = "is-active";

export function bindTouchControls({ root, keys, actions }) {
  if (!root) return () => {};

  const heldCodes = new Map();
  const buttons = [...root.querySelectorAll("[data-hold-code], [data-action]")];

  const releasePointer = (pointerId) => {
    const held = heldCodes.get(pointerId);
    if (!held) return;
    keys.delete(held.code);
    held.button.classList.remove(ACTIVE_CLASS);
    heldCodes.delete(pointerId);
  };

  for (const button of buttons) {
    button.addEventListener("contextmenu", (event) => event.preventDefault());

    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture?.(event.pointerId);
      button.classList.add(ACTIVE_CLASS);

      const holdCode = button.dataset.holdCode;
      if (holdCode) {
        keys.add(holdCode);
        heldCodes.set(event.pointerId, { code: holdCode, button });
        return;
      }

      const action = button.dataset.action;
      if (action && typeof actions?.[action] === "function") actions[action]();
    });

    const release = (event) => {
      if (button.dataset.holdCode) releasePointer(event.pointerId);
      else button.classList.remove(ACTIVE_CLASS);
    };

    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", release);
  }

  const releaseAll = () => {
    for (const pointerId of [...heldCodes.keys()]) releasePointer(pointerId);
    for (const button of buttons) button.classList.remove(ACTIVE_CLASS);
  };

  window.addEventListener("blur", releaseAll);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) releaseAll();
  });

  return releaseAll;
}
