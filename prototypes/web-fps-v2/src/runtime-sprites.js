import { ASSET_STORE, getLoadedImage } from "./asset-loader.js";
import { createEnemyAnimationDescriptor } from "./enemy-animation.js";
import { drawThreatSprite as drawProceduralThreat, drawPickupSprite } from "./procedural-sprites.js";

const THREAT_ASSET_KEYS = Object.freeze({
  spider_mite_swarm: "enemy.spider_mite",
  powdery_mildew_ghoul: "enemy.mildew_ghoul",
  nute_burn_sprayer: "enemy.nute_burn_sprayer"
});

export function drawThreatSprite(ctx, threat, x, y, size, now = performance.now()) {
  const key = THREAT_ASSET_KEYS[threat.type];
  const image = key ? getLoadedImage(ASSET_STORE, key) : null;
  const animation = createEnemyAnimationDescriptor(threat, now);

  if (!image) {
    drawProceduralThreatWithState(ctx, threat, x, y, size, animation);
    return;
  }

  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  const hitKick = animation.state === "hit" ? -size * 0.04 : 0;
  const attackScale = animation.state === "attack" ? 1.07 : 1;
  ctx.translate(0, hitKick);
  ctx.scale(attackScale, attackScale);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, -size * 0.5, -size * 0.62, size, size * 1.1);
  drawHealthBar(ctx, threat, size);
  ctx.restore();
}

export { drawPickupSprite };

function drawProceduralThreatWithState(ctx, threat, x, y, size, animation) {
  const bob = animation.state === "chase" ? Math.sin(animation.frame * Math.PI) * size * 0.025 : 0;
  const attackScale = animation.state === "attack" ? 1.06 : 1;
  const hitOffset = animation.state === "hit" ? -size * 0.035 : 0;

  ctx.save();
  ctx.translate(0, bob + hitOffset);
  ctx.scale(attackScale, attackScale);
  drawProceduralThreat(ctx, threat, x, y, size);
  ctx.restore();
}

function drawHealthBar(ctx, threat, size) {
  const healthRatio = threat.maxHealth ? Math.max(0, threat.health / threat.maxHealth) : 1;
  ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
  ctx.fillRect(-size * 0.34, size * 0.43, size * 0.68, Math.max(4, size * 0.055));
  ctx.fillStyle = healthRatio > 0.35 ? "#7cff5b" : "#ff5f7e";
  ctx.fillRect(-size * 0.34, size * 0.43, size * 0.68 * healthRatio, Math.max(4, size * 0.055));
}
