// 鐵面・鎮暴隊長（街道篇精英/魔王）：晨星鎮暴小隊的隊長級變異體，
// 頭部被金屬面罩包覆、左臂與鎮暴盾融合。推進時舉盾——正面射擊大幅減傷，
// 對策＝繞側背攻擊，或等它衝撞/揮擊的收招硬直。原著「鐵面副官」概念的街道版。
import { Enemy } from './base.js';

export class Ironmask extends Enemy {
  constructor(o) {
    super({ ...o, type: 'ironmask', hp: 320, speed: 2.1, radius: 0.42 });
    this.headZoneMultiplier = 1.2; // 金屬面罩——爆頭幾乎無加成
    this._chargeCd = 3;
  }

  hitSpheres() {
    return [
      { y: 0.95, r: 0.5, zone: 'body' },
      { y: 1.72, r: 0.22, zone: 'head' },
    ];
  }

  hurt(damage, zone = 'body') {
    if (this.dead) return 0;
    // 舉盾推進中：傷害 -70%（不分方向——簡化為「非硬直期皮很厚」，逼玩家等出招空檔）
    const shielded = this.state === 'chase' || this.state === 'idle';
    const scaled = shielded ? damage * 0.3 : damage;
    return super.hurt(scaled, zone);
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
        this._chargeCd -= dt;
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        if (d < 1.9) this.setState('swing');
        else if (d > 3 && d < 8 && this._chargeCd <= 0) this.setState('windup');
        break;
      }
      case 'windup': // 盾牌衝撞前搖（可側閃；衝撞期間無減傷）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 0.5) this.setState('charge');
        break;
      case 'charge': {
        const fx = -Math.sin(this.yaw);
        const fz = -Math.cos(this.yaw);
        this.moveToward(this.x + fx * 4, this.z + fz * 4, 7.5, dt, ctx.world);
        if (this.distTo(ctx.player.x, ctx.player.z) < 1.5) {
          ctx.attackPlayer(30);
          this._chargeCd = 3.2;
          this.setState('recover');
        } else if (this.stateTime >= 0.55) {
          this._chargeCd = 3.2;
          this.setState('recover');
        }
        break;
      }
      case 'swing': // 警棍橫掃
        if (this.stateTime >= 0.35) {
          if (this.distTo(ctx.player.x, ctx.player.z) < 2.3) ctx.attackPlayer(22);
          this.setState('recover');
        }
        break;
      case 'recover': // 收招硬直——輸出窗口
        if (this.stateTime >= 1.0) this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= 0.5) this.setState('chase');
        break;
    }
  }
}
