export function createSoundQueue() {
  return [];
}

export function queueSound(queue, id) {
  if (!queue) return;
  queue.push({ id, at: performance.now() });
  if (queue.length > 40) queue.shift();
}

export function drainSounds(queue) {
  if (!queue) return [];
  const items = [...queue];
  queue.length = 0;
  return items;
}
