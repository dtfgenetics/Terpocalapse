import { INTRO_SEQUENCE } from "./story/intro-sequence.js";
import { LORE_NOTES } from "./story/lore-notes.js";
import { ENDING_SEQUENCE } from "./story/ending-sequence.js";

export function createIntroPanel() {
  return {
    type: "intro",
    title: "Facility Alert",
    lines: INTRO_SEQUENCE.map((line) => `${line.speaker}: ${line.text}`),
    hint: "Press Enter to continue"
  };
}

export function createBriefingPanel(levelName, briefing) {
  return {
    type: "briefing",
    title: levelName,
    lines: [briefing],
    hint: "Press Enter to begin"
  };
}

export function createLorePanel(noteId) {
  const note = LORE_NOTES.find((entry) => entry.id === noteId);
  if (!note) return null;
  return {
    type: "lore",
    title: note.title,
    lines: [note.text],
    hint: "Press Enter to close"
  };
}

export function createEndingPanel() {
  return {
    type: "ending",
    title: "Seed Vault Secured",
    lines: ENDING_SEQUENCE.map((line) => `${line.speaker}: ${line.text}`),
    hint: "Episode complete"
  };
}
