export function createProgress(labels = []) {
  return {
    labels: labels.length ? labels : ["Reach the exit chamber"],
    current: 0
  };
}

export function progressLabel(progress) {
  return progress.labels[progress.current] || "Done";
}

export function advanceProgress(progress) {
  progress.current = Math.min(progress.current + 1, progress.labels.length);
}

export function setProgressAtLeast(progress, nextIndex) {
  const target = Math.max(0, Math.min(nextIndex, progress.labels.length));
  progress.current = Math.max(progress.current, target);
}

export function isProgressDone(progress) {
  return progress.current >= progress.labels.length;
}
