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

export function isProgressDone(progress) {
  return progress.current >= progress.labels.length;
}
