# V2 Content Status

## Implemented

- first-person Canvas2D raycast wall renderer
- keyboard movement, strafing, turning, sprint and pointer-look input
- touch movement, turning, fire, use, weapon-cycle, special and story controls
- tool switching for defined gear slots
- threat spawning and runtime threat updates
- pickup spawning and pickup collection
- locked gate / route-access interaction
- Trichome Burst special action
- health, armor, ammo, keycard and special state
- mission progress state
- story intro, briefing, lore and ending panels
- campaign memory and score calculation
- settings loading and display preferences
- sound queue / sound-player hooks
- projected runtime markers for threats and pickups
- debug minimap, HUD text, completion and failure states
- responsive stoner-horror title/menu presentation
- V2 integrity checks in CI

## Defined Content

- 9 level plans
- campaign registry
- campaign flow
- player profile
- player classes
- starting loadout
- inventory rules
- gear list
- gear balance
- threat list
- threat balance
- pickup list
- encounter table
- reward table
- mission objectives
- visual palettes
- room types
- status effects
- achievements
- clear ratings
- UI screens
- settings schema
- score values

## Production Gaps

- replace projected colored rectangles with original enemy and pickup sprites / animations
- add first-person weapon art and firing / recoil feedback
- expand wall, floor, ceiling, prop and door presentation beyond simple raycast color blocks
- confirm V2 Level 01 feature parity with the stable V1 through a complete playthrough
- convert mission progress state into a clear objective tracker in the HUD
- add touch-specific pause/settings affordances and verify phone landscape ergonomics
- implement playable maps and encounter tuning for the remaining episode levels
- add level select / campaign progression UI
- expand campaign save data beyond score memory
- implement the settings screen
- add final original art assets
- add final original audio assets
- add automated tests for pure gameplay modules where practical
- package the approved V2 build into the DTF website release suite and verify the live route on desktop and mobile

## Release Rule

V1 remains the stable public production target until V2 matches or exceeds every V1 gameplay feature, passes CI and playtesting, and is packaged through the DTF canonical release workflow. Do not replace V1 merely because V2 has newer presentation work.
