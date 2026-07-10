// 裂嘴犬王（街道篇魔王）：晨星實驗犬感染 KY 後巨大化，嘴部裂到耳後。
// 高速環繞逼近＋長距離飛撲；半血後狂暴加速。原著第 21 章魔王概念的街道版——
// 通常與小型犬群一起配置（關卡資料放置，非召喚）。
import { Enemy } from './base.js';

export class Dogking extends Enemy {
  constructor(o) {
    super({ ...o, type: 'dogking', hp: 380, speed: 4.2, radius: 0.5 });
    this.headZoneMultiplier = 1.8;
    this.frenzy = false;
    this._poundCd = 2.5;
  }

  hitSpheres() {
    return [
      { y: 0.55, r: 0.55, zone: 'body' },
      { y: 0.95, r: 0.28, zone: 'head' },
    ];
  }

  hurt(damage, zone = 'body') {
    const dmg = super.hurt(damage, zone);
    if (!this.frenzy && !this.dead && this.hp <= 190) {
      this.frenzy = true;
      this.speed = 5.4;
    }
    return dmg;
  }

  think(dt, ctx) {
    const d = this.distTo(ctx.player.x, ctx.player.z);
    if (!this.alerted) {
      if (d < 12) this.alert();
      else return;
    }
    switch (this.state) {
      case 'idle':
        this.setState('chase');
        break;
      case 'chase': {
        this._poundCd -= dt;
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        if (d < 1.6) this.setState('bite');
        else if (d > 2.5 && d < 7 && this._poundCd <= 0) this.setState('crouch');
        break;
      }
      case 'crouch': // 壓低身子蓄力（側閃時機）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 0.4) this.setState('pounce');
        break;
      case 'pounce': { // 飛撲
        const fx = -Math.sin(this.yaw);
        const fz = -Math.cos(this.yaw);
        this.moveToward(this.x + fx * 5, this.z + fz * 5, 11, dt, ctx.world);
        if (this.distTo(ctx.player.x, ctx.player.z) < 1.4) {
          ctx.attackPlayer(this.frenzy ? 34 : 26);
          this._poundCd = this.frenzy ? 1.8 : 2.6;
          this.setState('recover');
        } else if (this.stateTime >= 0.5) {
          this._poundCd = this.frenzy ? 1.8 : 2.6;
          this.setState('recover');
        }
        break;
      }
      case 'bite':
        if (this.stateTime >= 0.28) {
          if (this.distTo(ctx.player.x, ctx.player.z) < 1.9) ctx.attackPlayer(18);
          this.setState('cooldown');
        }
        break;
      case 'recover':
        if (this.stateTime >= 0.8) this.setState('chase');
        break;
      case 'cooldown':
        if (this.stateTime >= 0.5) this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= 0.35) this.setState('chase');
        break;
    }
  }
}
