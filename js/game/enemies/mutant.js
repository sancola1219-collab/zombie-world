// KY 變異體：第一隻初代感染者（那個被咬的助理）。
// 感染早期——還保有人形與爆發力，比殭屍快得多、會短距衝撲、感覺不到痛
// （受擊硬直短）。半血後進入狂暴：加速、撲擊更頻繁。
import { Enemy } from './base.js';

export class Mutant extends Enemy {
  constructor(o) {
    super({ ...o, type: 'mutant', hp: 160, speed: 2.4, radius: 0.38 });
    this.frenzy = false;
  }

  hitSpheres() {
    return [
      { y: 0.95, r: 0.42, zone: 'body' },
      { y: 1.55, r: 0.2, zone: 'head' }, // 爆頭 2 倍
    ];
  }

  hurt(damage, zone = 'body') {
    const dmg = super.hurt(damage, zone);
    // 半血狂暴：加速、硬直更難觸發
    if (!this.frenzy && !this.dead && this.hp <= 80) {
      this.frenzy = true;
      this.speed = 3.4;
    }
    return dmg;
  }

  think(dt, ctx) {
    const d = this.distTo(ctx.player.x, ctx.player.z);
    if (!this.alerted) {
      if (d < 11) this.alert();
      else return;
    }
    switch (this.state) {
      case 'idle':
        this.setState('chase');
        break;
      case 'chase': {
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        this.faceToward(ctx.player.x, ctx.player.z);
        // 中距離發動衝撲；狂暴時觸發距離更遠
        if (d < 1.5) this.setState('bite');
        else if (d < (this.frenzy ? 4 : 3) && this.stateTime > 0.3) this.setState('windup');
        break;
      }
      case 'windup': // 前搖（可側閃）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= (this.frenzy ? 0.32 : 0.45)) this.setState('lunge');
        break;
      case 'lunge': {
        const fx = -Math.sin(this.yaw);
        const fz = -Math.cos(this.yaw);
        this.moveToward(this.x + fx * 4, this.z + fz * 4, this.frenzy ? 11 : 9, dt, ctx.world);
        if (this.distTo(ctx.player.x, ctx.player.z) < 1.2) {
          ctx.attackPlayer(30);
          if (ctx.sound) ctx.sound('bite');
          this.setState('recover');
        } else if (this.stateTime >= 0.35) {
          this.setState('recover');
        }
        break;
      }
      case 'bite':
        if (this.stateTime >= 0.35) {
          if (this.distTo(ctx.player.x, ctx.player.z) < 1.6) {
            ctx.attackPlayer(24);
            if (ctx.sound) ctx.sound('bite');
          }
          this.setState('cooldown');
        }
        break;
      case 'recover':
        if (this.stateTime >= (this.frenzy ? 0.5 : 0.8)) this.setState('chase');
        break;
      case 'cooldown':
        if (this.stateTime >= 0.45) this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= (this.frenzy ? 0.2 : 0.35)) this.setState('chase');
        break;
    }
  }
}
