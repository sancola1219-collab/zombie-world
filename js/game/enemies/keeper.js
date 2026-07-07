// 電氣室守門者（第一章魔王）：原 E 區值班技術員，接觸 KY 黏液後變異。
// 半邊身軀被電弧燒焦、背上插著斷裂電纜。緩慢但皮厚，帶電手臂砸地——
// 被砸中除了受傷還會「電擊麻痺」（移動大幅減速），必須拉開距離打帶跑。
import { Enemy } from './base.js';

export class Keeper extends Enemy {
  constructor(o) {
    super({ ...o, type: 'keeper', hp: 150, speed: 1.5, radius: 0.45 });
    this.headZoneMultiplier = 1.6; // 顱骨半熔——爆頭加成較低
  }

  hitSpheres() {
    return [
      { y: 0.95, r: 0.55, zone: 'body' },
      { y: 1.75, r: 0.24, zone: 'head' },
    ];
  }

  think(dt, ctx) {
    const d = this.distTo(ctx.player.x, ctx.player.z);
    if (!this.alerted) {
      if (d < 8) this.alert();
      else return;
    }
    switch (this.state) {
      case 'idle':
        this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= 0.32) this.setState('chase'); // 硬直短：壓迫感
        break;
      case 'chase': {
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        if (d < 1.9) this.setState('windup');
        break;
      }
      case 'windup':
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 0.65) this.setState('attack');
        break;
      case 'attack': {
        // 帶電手臂砸地：命中＝傷害＋電擊麻痺
        const dd = this.distTo(ctx.player.x, ctx.player.z);
        if (dd < 2.1) {
          ctx.attackPlayer(20);
          if (ctx.stunPlayer) ctx.stunPlayer(1.2);
        }
        if (ctx.sound) ctx.sound('shock');
        this.setState('recover');
        break;
      }
      case 'recover':
        if (this.stateTime >= 0.9) this.setState('chase');
        break;
    }
  }
}
