// 縫合醫師（醫院篇 ch21 魔王）：晨星的手術醫師與機械臂支架融合的變異體。
// 近戰手術刀連擊；受創後若玩家拉開距離，會停下「替自己縫合」快速回血——
// 對策＝貼身壓制不給它縫合的空檔，或用重擊打斷縫合。原著第 18 章魔王。
import { Enemy } from './base.js';

export class Stitcher extends Enemy {
  constructor(o) {
    super({ ...o, type: 'stitcher', hp: 520, speed: 2.0, radius: 0.42 });
    this.headZoneMultiplier = 2.0;
    this._lastHp = this.hp;
    this._sutureCd = 3;
  }

  hitSpheres() {
    return [
      { y: 0.95, r: 0.5, zone: 'body' },
      { y: 1.7, r: 0.22, zone: 'head' },
    ];
  }

  hurt(damage, zone = 'body') {
    const dmg = super.hurt(damage, zone);
    // 縫合中被打 60+ 傷會打斷（super.hurt 已轉 stagger，這裡只需清縫合計時）
    if (this.state === 'stagger') this._sutureCd = Math.max(this._sutureCd, 2);
    return dmg;
  }

  think(dt, ctx) {
    const d = this.distTo(ctx.player.x, ctx.player.z);
    if (!this.alerted) {
      if (d < 10) this.alert();
      else return;
    }
    switch (this.state) {
      case 'idle':
        this.setState('chase');
        break;
      case 'chase': {
        this._sutureCd -= dt;
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        if (d < 1.9) this.setState('slash');
        // 受了傷、玩家又遠：停下縫合回血
        else if (d > 6 && this.hp < 480 && this._sutureCd <= 0) this.setState('suture');
        break;
      }
      case 'slash': // 手術刀二連擊
        if (this.stateTime >= 0.3 && !this._hit1) {
          this._hit1 = true;
          if (this.distTo(ctx.player.x, ctx.player.z) < 2.2) ctx.attackPlayer(16);
        }
        if (this.stateTime >= 0.6) {
          this._hit1 = false;
          if (this.distTo(ctx.player.x, ctx.player.z) < 2.2) ctx.attackPlayer(16);
          this.setState('cooldown');
        }
        break;
      case 'suture': { // ★ 自我縫合：每秒回 30，最多 3 秒——快打斷它！
        this.hp = Math.min(520, this.hp + 30 * dt);
        if (this.stateTime === dt && ctx.sound) ctx.sound('reload'); // 縫合器械聲
        if (this.stateTime >= 3 || this.distTo(ctx.player.x, ctx.player.z) < 3) {
          this._sutureCd = 6;
          this.setState('chase');
        }
        break;
      }
      case 'cooldown':
        if (this.stateTime >= 0.7) this.setState('chase');
        break;
      case 'stagger': // 硬直會打斷縫合
        if (this.stateTime >= 0.45) this.setState('chase');
        break;
    }
  }
}
