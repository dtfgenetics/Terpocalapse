import { TILE, MAP, PLAYER_START, WEAPONS, ENEMY_TYPES, ENEMY_SPAWNS, PICKUPS } from "./game-data.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("startButton");
const toast = document.getElementById("toast");

const FOV = Math.PI / 3;
const MAX_VIEW = TILE * 13;
const keysDown = new Set();
const pointer = { locked: false, mouseDown: false };
let width = 1;
let height = 1;
let projection = 1;
let mode = "menu";
let lastFrame = performance.now();
let toastTimer = 0;
let fireFlashUntil = 0;
let doorOpen = false;

const player = {
  x: PLAYER_START.x,
  y: PLAYER_START.y,
  angle: PLAYER_START.angle,
  radius: 15,
  hp: 100,
  armor: 0,
  special: 55,
  score: 0,
  keys: { green: false, purple: false, gold: false },
  ammo: { light: 24, heavy: 4 },
  weapons: Object.fromEntries(Object.entries(WEAPONS).map(([id, weapon]) => [id, { ...weapon }])),
  currentWeapon: "shears",
  lastShot: 0,
  lastSpecial: 0,
  damageFlash: 0
};

const enemies = ENEMY_SPAWNS.map((spawn, index) => {
  const type = ENEMY_TYPES[spawn.type];
  return {
    id: `enemy-${index}`,
    ...spawn,
    ...type,
    hp: type.maxHp,
    maxHp: type.maxHp,
    lastAttack: 0,
    painUntil: 0,
    dead: false
  };
});

const pickups = PICKUPS.map((pickup) => ({ ...pickup, active: true }));
const projectiles = [];

function resize() {
  width = Math.max(320, window.innerWidth);
  height = Math.max(240, window.innerHeight);
  canvas.width = width;
  canvas.height = height;
  projection = (width / 2) / Math.tan(FOV / 2);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function normalizeAngle(angle) {
  while (angle < -Math.PI) angle += Math.PI * 2;
  while (angle > Math.PI) angle -= Math.PI * 2;
  return angle;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function mapCharAt(tx, ty) {
  if (ty < 0 || ty >= MAP.length || tx < 0 || tx >= MAP[0].length) return "#";
  return MAP[ty][tx];
}

function worldCharAt(x, y) {
  return mapCharAt(Math.floor(x / TILE), Math.floor(y / TILE));
}

function blocksMovement(x, y) {
  const tile = worldCharAt(x, y);
  if (tile === "#") return true;
  if (tile === "D" && !doorOpen) return true;
  return false;
}

function canStandAt(x, y, radius = player.radius) {
  return !(
    blocksMovement(x - radius, y - radius) ||
    blocksMovement(x + radius, y - radius) ||
    blocksMovement(x - radius, y + radius) ||
    blocksMovement(x + radius, y + radius)
  );
}

function moveEntity(entity, dx, dy, radius = entity.radius || 14) {
  const nextX = entity.x + dx;
  const nextY = entity.y + dy;
  if (canStandAt(nextX, entity.y, radius)) entity.x = nextX;
  if (canStandAt(entity.x, nextY, radius)) entity.y = nextY;
}

function castRay(angle, maxDistance = MAX_VIEW) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  let x = player.x;
  let y = player.y;
  for (let d = 0; d < maxDistance; d += 4) {
    x = player.x + cos * d;
    y = player.y + sin * d;
    const tile = worldCharAt(x, y);
    if (tile === "#" || (tile === "D" && !doorOpen)) {
      return { distance: d, tile, x, y };
    }
  }
  return { distance: maxDistance, tile: ".", x, y };
}

function hasLineOfSight(a, b) {
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  const limit = Math.hypot(b.x - a.x, b.y - a.y);
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  for (let d = 0; d < limit; d += 8) {
    if (blocksMovement(a.x + cos * d, a.y + sin * d)) return false;
  }
  return true;
}

function tileColor(tile, dist) {
  const shade = Math.max(0.22, 1 - dist / MAX_VIEW);
  const colors = {
    "#": [32, 74, 45],
    D: [56, 150, 72],
    X: [180, 130, 38]
  };
  const [r, g, b] = colors[tile] || colors["#"];
  return `rgb(${Math.floor(r * shade)}, ${Math.floor(g * shade)}, ${Math.floor(b * shade)})`;
}

function drawWorld() {
  const sky = ctx.createLinearGradient(0, 0, 0, height / 2);
  sky.addColorStop(0, "#07150c");
  sky.addColorStop(1, "#162818");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height / 2);

  const floor = ctx.createLinearGradient(0, height / 2, 0, height);
  floor.addColorStop(0, "#10140f");
  floor.addColorStop(1, "#030603");
  ctx.fillStyle = floor;
  ctx.fillRect(0, height / 2, width, height / 2);

  for (let x = 0; x < width; x += 2) {
    const angle = player.angle - FOV / 2 + (x / width) * FOV;
    const hit = castRay(angle);
    const corrected = Math.max(1, hit.distance * Math.cos(angle - player.angle));
    const wallHeight = Math.min(height * 1.5, (TILE * projection) / corrected);
    const top = height / 2 - wallHeight / 2;
    ctx.fillStyle = tileColor(hit.tile, corrected);
    ctx.fillRect(x, top, 2.5, wallHeight);

    if (hit.tile === "D") {
      ctx.fillStyle = "rgba(124,255,91,0.28)";
      ctx.fillRect(x, top + wallHeight * 0.42, 2.5, wallHeight * 0.16);
    }
  }
}

function drawBillboardSprite(obj, renderType) {
  const dx = obj.x - player.x;
  const dy = obj.y - player.y;
  const dist = Math.hypot(dx, dy);
  const angleTo = Math.atan2(dy, dx);
  const diff = normalizeAngle(angleTo - player.angle);
  if (Math.abs(diff) > FOV * 0.65 || dist < 8) return;
  const wallHit = castRay(angleTo, dist + 8);
  if (wallHit.distance < dist - 12) return;

  const screenX = width / 2 + Math.tan(diff) * projection;
  const baseSize = (TILE * projection) / dist;
  const size = Math.max(8, baseSize * (renderType === "enemy" ? 0.95 : 0.45));
  const bottom = height / 2 + size * 0.6;
  const left = screenX - size / 2;
  const top = bottom - size;

  if (renderType === "pickup") {
    ctx.save();
    ctx.translate(screenX, top + size / 2);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = obj.color;
    ctx.fillRect(-size * 0.28, -size * 0.28, size * 0.56, size * 0.56);
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = Math.max(1, size * 0.04);
    ctx.strokeRect(-size * 0.28, -size * 0.28, size * 0.56, size * 0.56);
    ctx.restore();
    if (dist < 150) {
      drawTinyLabel(obj.label, screenX, top - 8, obj.color);
    }
    return;
  }

  if (renderType === "projectile") {
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(screenX, top + size / 2, Math.max(4, size * 0.15), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.arc(screenX - 2, top + size / 2 - 2, Math.max(2, size * 0.06), 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  const wounded = obj.painUntil > performance.now();
  ctx.fillStyle = wounded ? "#ffffff" : obj.color;
  ctx.beginPath();
  ctx.ellipse(screenX, top + size * 0.58, size * 0.36, size * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = obj.accent;
  ctx.beginPath();
  ctx.arc(screenX, top + size * 0.28, size * 0.22, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(0,0,0,0.85)";
  ctx.lineWidth = Math.max(2, size * 0.035);
  ctx.stroke();

  const barW = Math.max(26, size * 0.8);
  const barH = Math.max(4, size * 0.055);
  const hpPct = Math.max(0, obj.hp / obj.maxHp);
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillRect(screenX - barW / 2, top - barH * 2, barW, barH);
  ctx.fillStyle = hpPct > 0.45 ? "#7cff5b" : "#ff4f4f";
  ctx.fillRect(screenX - barW / 2, top - barH * 2, barW * hpPct, barH);

  if (dist < 220) {
    drawTinyLabel(obj.name, screenX, top - barH * 3.2, obj.accent);
  }
}

function drawTinyLabel(text, x, y, color) {
  ctx.font = "700 12px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  const w = ctx.measureText(text).width + 12;
  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.fillRect(x - w / 2, y - 16, w, 18);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y - 2);
}

function drawSprites() {
  const visible = [];
  for (const pickup of pickups) if (pickup.active) visible.push({ ...pickup, renderType: "pickup", dist: distance(player, pickup) });
  for (const enemy of enemies) if (!enemy.dead) visible.push({ ...enemy, renderType: "enemy", dist: distance(player, enemy) });
  for (const projectile of projectiles) visible.push({ ...projectile, renderType: "projectile", dist: distance(player, projectile) });
  visible.sort((a, b) => b.dist - a.dist);
  for (const obj of visible) drawBillboardSprite(obj, obj.renderType);
}

function drawWeapon() {
  const weapon = player.weapons[player.currentWeapon];
  const cx = width / 2;
  const baseY = height - 18;
  const scale = Math.min(width, height) / 680;
  ctx.save();
  ctx.translate(cx, baseY);
  ctx.scale(scale, scale);

  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(-125, -128, 250, 140);

  if (weapon.id === "shears") {
    ctx.fillStyle = "#bfc7bf";
    ctx.fillRect(-18, -118, 16, 100);
    ctx.fillRect(10, -118, 16, 100);
    ctx.strokeStyle = "#7cff5b";
    ctx.lineWidth = 4;
    ctx.strokeRect(-28, -35, 28, 28);
    ctx.strokeRect(8, -35, 28, 28);
  } else if (weapon.id === "phBlaster") {
    ctx.fillStyle = "#1b3038";
    ctx.fillRect(-38, -72, 82, 42);
    ctx.fillStyle = "#66d9ff";
    ctx.fillRect(18, -84, 60, 16);
    ctx.fillStyle = "#111";
    ctx.fillRect(-16, -30, 24, 45);
  } else {
    ctx.fillStyle = "#1e2c1a";
    ctx.fillRect(-82, -80, 160, 38);
    ctx.fillStyle = "#9cff6e";
    ctx.fillRect(35, -92, 70, 18);
    ctx.fillStyle = "#111";
    ctx.fillRect(-42, -42, 38, 58);
  }

  if (performance.now() < fireFlashUntil) {
    ctx.fillStyle = "rgba(255,248,140,0.9)";
    ctx.beginPath();
    ctx.arc(72, -86, 24, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawHud() {
  const weapon = player.weapons[player.currentWeapon];
  const ammoText = weapon.ammoType ? player.ammo[weapon.ammoType] : "∞";
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(0, height - 74, width, 74);
  ctx.strokeStyle = "rgba(124,255,91,0.5)";
  ctx.strokeRect(0, height - 74, width, 74);

  drawHudText(`HP ${Math.ceil(player.hp)}`, 18, height - 48, player.hp < 30 ? "#ff4f4f" : "#7cff5b");
  drawHudText(`ARM ${Math.ceil(player.armor)}`, 130, height - 48, "#ffc857");
  drawHudText(`AMMO ${ammoText}`, 255, height - 48, "#70c7ff");
  drawHudText(`WEAPON ${weapon.name}`, 390, height - 48, "#ffffff");
  drawHudText(`SPECIAL ${Math.floor(player.special)}%`, 18, height - 20, "#dca2ff");
  drawHudText(`KEY ${player.keys.green ? "GREEN" : "---"}`, 175, height - 20, player.keys.green ? "#7cff5b" : "#777");
  drawHudText(`SCORE ${player.score}`, 300, height - 20, "#ffc857");

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  ctx.moveTo(width / 2 - 9, height / 2);
  ctx.lineTo(width / 2 + 9, height / 2);
  ctx.moveTo(width / 2, height / 2 - 9);
  ctx.lineTo(width / 2, height / 2 + 9);
  ctx.stroke();

  if (player.damageFlash > performance.now()) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.18)";
    ctx.fillRect(0, 0, width, height);
  }
}

function drawHudText(text, x, y, color) {
  ctx.font = "800 16px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "left";
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function renderStatusPanel(title, subtitle) {
  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.fillRect(0, 0, width, height);
  ctx.textAlign = "center";
  ctx.fillStyle = "#7cff5b";
  ctx.font = "900 54px system-ui";
  ctx.fillText(title, width / 2, height / 2 - 32);
  ctx.fillStyle = "#fff";
  ctx.font = "700 20px system-ui";
  ctx.fillText(subtitle, width / 2, height / 2 + 14);
  ctx.fillStyle = "#ffc857";
  ctx.fillText("Press Enter to restart", width / 2, height / 2 + 54);
}

function applyDamageToPlayer(amount) {
  const armorBlock = Math.min(player.armor, amount * 0.55);
  player.armor -= armorBlock;
  player.hp -= amount - armorBlock;
  player.damageFlash = performance.now() + 130;
  if (player.hp <= 0) {
    player.hp = 0;
    mode = "dead";
    showToast("You were overrun in The Veg Lab.");
  }
}

function damageEnemy(enemy, amount) {
  if (!enemy || enemy.dead) return;
  enemy.hp -= amount;
  enemy.painUntil = performance.now() + 110;
  if (enemy.hp <= 0) {
    enemy.dead = true;
    player.score += enemy.score;
    player.special = Math.min(100, player.special + 12);
    showToast(`${enemy.name} cleared`);
  }
}

function findEnemyHit(angle, range) {
  let best = null;
  let bestDist = Infinity;
  for (const enemy of enemies) {
    if (enemy.dead) continue;
    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const dist = Math.hypot(dx, dy);
    if (dist > range) continue;
    const diff = Math.abs(normalizeAngle(Math.atan2(dy, dx) - angle));
    const hitWindow = Math.atan2(enemy.radius + 8, dist);
    if (diff <= hitWindow && dist < bestDist && hasLineOfSight(player, enemy)) {
      best = enemy;
      bestDist = dist;
    }
  }
  return best;
}

function shoot() {
  if (mode !== "running") return;
  const now = performance.now();
  const weapon = player.weapons[player.currentWeapon];
  if (now - player.lastShot < weapon.cooldown) return;

  if (weapon.ammoType && player.ammo[weapon.ammoType] <= 0) {
    player.lastShot = now;
    showToast("No ammo");
    return;
  }

  player.lastShot = now;
  fireFlashUntil = now + 90;
  if (weapon.ammoType) player.ammo[weapon.ammoType] -= 1;

  let didHit = false;
  for (let i = 0; i < weapon.pellets; i += 1) {
    const pelletOffset = weapon.pellets === 1 ? 0 : (Math.random() - 0.5) * weapon.spread;
    const aim = player.angle + pelletOffset + (Math.random() - 0.5) * weapon.spread * 0.25;
    const enemy = findEnemyHit(aim, weapon.range);
    if (enemy) {
      didHit = true;
      damageEnemy(enemy, weapon.damage);
    }
  }
  if (!didHit && weapon.type === "melee") showToast("Too far");
}

function useSpecial() {
  if (mode !== "running") return;
  const now = performance.now();
  if (now - player.lastSpecial < 900) return;
  if (player.special < 50) {
    showToast("Special not charged");
    return;
  }
  player.lastSpecial = now;
  player.special -= 50;
  let hitCount = 0;
  for (const enemy of enemies) {
    if (!enemy.dead && distance(player, enemy) < 190 && hasLineOfSight(player, enemy)) {
      damageEnemy(enemy, 70);
      hitCount += 1;
    }
  }
  fireFlashUntil = now + 220;
  showToast(hitCount ? `Trichome Burst hit ${hitCount}` : "Trichome Burst fired");
}

function interact() {
  if (mode !== "running") return;
  const fx = player.x + Math.cos(player.angle) * 46;
  const fy = player.y + Math.sin(player.angle) * 46;
  const tile = worldCharAt(fx, fy);
  if (tile === "D") {
    if (player.keys.green) {
      doorOpen = true;
      showToast("Green door unlocked");
    } else {
      showToast("Green keycard required");
    }
  } else if (tile === "X" || worldCharAt(player.x, player.y) === "X") {
    mode = "win";
    showToast("The Veg Lab secured");
  } else {
    showToast("Nothing to use here");
  }
}

function collectPickups() {
  for (const pickup of pickups) {
    if (!pickup.active || distance(player, pickup) > 30) continue;
    pickup.active = false;
    if (pickup.type === "weapon") {
      player.weapons[pickup.weapon].unlocked = true;
      player.currentWeapon = pickup.weapon;
    }
    if (pickup.type === "health") player.hp = Math.min(100, player.hp + pickup.amount);
    if (pickup.type === "armor") player.armor = Math.min(100, player.armor + pickup.amount);
    if (pickup.type === "ammo") player.ammo[pickup.ammoType] += pickup.amount;
    if (pickup.type === "key") player.keys[pickup.key] = true;
    if (pickup.type === "special") player.special = Math.min(100, player.special + pickup.amount);
    showToast(`Picked up ${pickup.label}`);
  }
}

function updatePlayer(dt) {
  let moveX = 0;
  let moveY = 0;
  const speed = (keysDown.has("ShiftLeft") || keysDown.has("ShiftRight") ? 190 : 135) * dt;
  const forwardX = Math.cos(player.angle);
  const forwardY = Math.sin(player.angle);
  const rightX = Math.cos(player.angle + Math.PI / 2);
  const rightY = Math.sin(player.angle + Math.PI / 2);

  if (keysDown.has("KeyW") || keysDown.has("ArrowUp")) {
    moveX += forwardX * speed;
    moveY += forwardY * speed;
  }
  if (keysDown.has("KeyS") || keysDown.has("ArrowDown")) {
    moveX -= forwardX * speed;
    moveY -= forwardY * speed;
  }
  if (keysDown.has("KeyA")) {
    moveX -= rightX * speed;
    moveY -= rightY * speed;
  }
  if (keysDown.has("KeyD")) {
    moveX += rightX * speed;
    moveY += rightY * speed;
  }
  if (keysDown.has("ArrowLeft")) player.angle -= 2.35 * dt;
  if (keysDown.has("ArrowRight")) player.angle += 2.35 * dt;

  moveEntity(player, moveX, moveY, player.radius);
  if (keysDown.has("Space")) shoot();
  collectPickups();
  if (worldCharAt(player.x, player.y) === "X") mode = "win";
}

function updateEnemies(dt) {
  const now = performance.now();
  for (const enemy of enemies) {
    if (enemy.dead) continue;
    const target = { x: player.x, y: player.y };
    const dist = distance(enemy, target);
    const los = hasLineOfSight(enemy, target);
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);

    if (enemy.ranged && los && dist < enemy.attackRange) {
      if (now - enemy.lastAttack > enemy.cooldown) {
        enemy.lastAttack = now;
        projectiles.push({
          x: enemy.x,
          y: enemy.y,
          angle,
          speed: enemy.projectileSpeed,
          damage: enemy.damage,
          radius: 7,
          color: "#fffb8c",
          owner: enemy.id
        });
      }
    } else if (dist > enemy.attackRange * 0.75 && los) {
      moveEntity(enemy, Math.cos(angle) * enemy.speed * dt, Math.sin(angle) * enemy.speed * dt, enemy.radius);
    }

    if (!enemy.ranged && dist < enemy.attackRange && now - enemy.lastAttack > enemy.cooldown) {
      enemy.lastAttack = now;
      applyDamageToPlayer(enemy.damage);
      showToast(`${enemy.name} hit you`);
    }
  }
}

function updateProjectiles(dt) {
  for (let i = projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = projectiles[i];
    projectile.x += Math.cos(projectile.angle) * projectile.speed * dt;
    projectile.y += Math.sin(projectile.angle) * projectile.speed * dt;
    if (blocksMovement(projectile.x, projectile.y)) {
      projectiles.splice(i, 1);
      continue;
    }
    if (distance(player, projectile) < player.radius + projectile.radius) {
      applyDamageToPlayer(projectile.damage);
      projectiles.splice(i, 1);
    }
  }
}

function update(dt) {
  if (mode !== "running") return;
  updatePlayer(dt);
  updateEnemies(dt);
  updateProjectiles(dt);
  player.special = Math.min(100, player.special + dt * 1.6);
}

function render() {
  drawWorld();
  drawSprites();
  drawWeapon();
  drawHud();

  if (mode === "paused") renderStatusPanel("Paused", "Press Esc or click to resume");
  if (mode === "dead") renderStatusPanel("Overrun", "The Veg Lab swallowed you whole");
  if (mode === "win") renderStatusPanel("Mission Complete", "The Veg Lab is secured for THC");
}

function loop(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

function restart() {
  location.reload();
}

function startGame() {
  mode = "running";
  overlay.classList.add("hidden");
  canvas.requestPointerLock?.();
  showToast("Secure The Veg Lab");
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  keysDown.add(event.code);
  if (event.code === "Digit1") player.currentWeapon = "shears";
  if (event.code === "Digit2" && player.weapons.phBlaster.unlocked) player.currentWeapon = "phBlaster";
  if (event.code === "Digit3" && player.weapons.neemCannon.unlocked) player.currentWeapon = "neemCannon";
  if (event.code === "KeyE") interact();
  if (event.code === "KeyQ") useSpecial();
  if (event.code === "Enter" && (mode === "dead" || mode === "win")) restart();
  if (event.code === "Escape" && mode === "running") mode = "paused";
});
window.addEventListener("keyup", (event) => keysDown.delete(event.code));
window.addEventListener("mousedown", () => {
  pointer.mouseDown = true;
  if (mode === "paused") mode = "running";
  if (mode === "running") shoot();
  canvas.requestPointerLock?.();
});
window.addEventListener("mouseup", () => {
  pointer.mouseDown = false;
});
document.addEventListener("pointerlockchange", () => {
  pointer.locked = document.pointerLockElement === canvas;
});
document.addEventListener("mousemove", (event) => {
  if (pointer.locked && mode === "running") {
    player.angle += event.movementX * 0.0024;
  }
});
startButton.addEventListener("click", startGame);

resize();
requestAnimationFrame(loop);
