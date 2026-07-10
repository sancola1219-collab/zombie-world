// 嘶吼者（街道篇）：喉部與警笛/擴音喇叭融合的瘦長變異體。
// 保持中距離發出尖嘯——驚動整張地圖的敵人（ctx.alertAll），近距離則被音波震傷。
// 對策＝優先擊殺，否則每一聲嘶吼都在替屍潮導航。
import { Enemy } from './base.js';

export class Howler extends Enemy {
  constructor(o) {
    super({ ...o, type: 'howler', hp: 120, speed: 2.6, radius: 0.34 });
    this.headZoneMultiplier = 2.4; // 喉部喇叭＝要害
    this._howlCd = 2;
  }

  hitSpheres() {
    return [
      { y: 0.95, r: 0.4, zone: 'body' },
      { y: 1.62, r: 0.22, zone: 'head' },
    ];
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
        this._howlCd -= dt;
        if (d < 3.5) {
          // 想保持距離：後退
          const bx = this.x + (this.x - ctx.player.x);
          const bz = this.z + (this.z - ctx.player.z);
          this.moveToward(bx, bz, this.speed, dt, ctx.world);
          this.faceToward(ctx.player.x, ctx.player.z);
        } else if (d > 9) {
          const [tx, tz] = this.chaseTarget(ctx);
          this.moveToward(tx, tz, this.speed, dt, ctx.world);
        } else {
          this.faceToward(ctx.player.x, ctx.player.z);
        }
        if (this._howlCd <= 0 && d < 12) this.setState('inhale');
        break;
      }
      case 'inhale': // 吸氣前搖（打斷它！）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 0.7) this.setState('howl');
        break;
      case 'howl': {
        if (this.stateTime === dt) {
          if (ctx.sound) ctx.sound('howl');
          if (ctx.alertAll) ctx.alertAll(); // 尖嘯驚動全場
          if (this.distTo(ctx.player.x, ctx.player.z) < 4) ctx.attackPlayer(10); // 近距音波震傷
        }
        if (this.stateTime >= 0.5) {
          this._howlCd = 5.5;
          this.setState('chase');
        }
        break;
      }
      case 'stagger': // 硬直會打斷吸氣
        if (this.stateTime >= 0.45) this.setState('chase');
        break;
    }
  }
}
