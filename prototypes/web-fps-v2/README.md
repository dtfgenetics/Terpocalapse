# Terpocalypse Web FPS V2

This folder is the safer next-generation prototype area.

## Purpose

V1 proves the game loop. V2 exists so we can improve structure and quality without breaking the working prototype.

## V2 Goals

- modular files
- cleaner startup
- data-driven level loading
- settings support
- asset fallback support
- website-ready layout
- better HUD and player feedback
- cleaner QA path

## Relationship to V1

Do not delete or overwrite V1 until V2 is confirmed playable.

V1 path:

```text
prototypes/web-fps/
```

V2 path:

```text
prototypes/web-fps-v2/
```

## First V2 Acceptance Criteria

- page loads
- title screen appears
- canvas fills screen
- input module exists
- state module exists
- render module exists
- game data module exists
- QA notes are updated

## Upgrade Rule

Only switch the website route to V2 after V2 can do everything V1 can do.
