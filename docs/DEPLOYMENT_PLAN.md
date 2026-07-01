# Terpocalypse — Website Deployment Plan

## Target

Deploy **Terpocalypse: Grow Room From Hell** as a playable browser game inside the DTF / THC game hub.

## Current Build Type

The current prototype is static HTML/CSS/JS.

That means it can be hosted by almost any normal website setup:

- Hostinger static hosting
- WordPress custom page/embed
- React/Vite game hub route
- iframe embed
- standalone `/games/terpocalypse/` folder

## Recommended Website Path

Preferred final route:

```text
/games/terpocalypse/
```

Prototype source folder:

```text
prototypes/web-fps/
```

Deployment folder should contain:

```text
index.html
styles.css
src/
assets/
```

## Minimum Deployment Requirements

- HTTPS enabled
- static file serving
- correct MIME type for `.js` modules
- no mixed-content asset URLs
- no private API keys
- no server dependency for first prototype

## Browser Requirements

- Canvas 2D support
- ES modules support
- pointer lock support for full mouse-look experience
- localStorage support for best-run storage later

## WordPress / Game Hub Embed Option

If embedding into WordPress, use an iframe pointed at the static game folder:

```html
<iframe
  src="/games/terpocalypse/index.html"
  title="Terpocalypse: Grow Room From Hell"
  width="100%"
  height="720"
  allow="fullscreen; gamepad; autoplay"
></iframe>
```

Better long-term route: serve it as a full-screen game page instead of a small embed.

## Game Hub Integration Events

`prototypes/web-fps/src/game-hub-api.js` exposes a browser event pattern:

```js
window.addEventListener("terpocalypse:game-event", (event) => {
  console.log(event.detail);
});
```

Planned event types:

- `gameStart`
- `pickup`
- `enemyKilled`
- `specialUsed`
- `doorUnlocked`
- `playerDown`
- `levelComplete`

These events can later connect to the game hub UI, analytics, achievements, or community leaderboards.

## Build / Release Checklist

Before uploading to the website:

1. Run game data validation.
2. Open local prototype in browser.
3. Verify no console errors.
4. Verify pointer lock works.
5. Verify player can finish level.
6. Verify no external copyrighted assets are present.
7. Verify all asset paths are relative.
8. Verify no secrets/API keys are committed.
9. Zip or copy the static folder.
10. Upload to `/games/terpocalypse/`.
11. Test live route on desktop browser.
12. Test mobile warning/fallback once implemented.

## Missing Before Public Launch

- mobile fallback screen
- asset preloader loading screen
- real visual assets
- audio files
- settings menu
- final logo/title screen art
- level complete stats
- privacy-safe analytics decision
- accessibility settings

## Immediate Deployment Recommendation

Do not publish as a public polished game yet. Publish as an internal prototype route first:

```text
/games/terpocalypse-prototype/
```

Once it has final art, audio, and QA passes, move or redirect to:

```text
/games/terpocalypse/
```
