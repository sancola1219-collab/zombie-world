// 晨星清除小組（黑衣人）：唯一的人類敵人——持手槍遠程射擊。
// 保持中距離、瞄準前搖後開火；玩家逼近時會後退拉開距離。
// 對策：繞掩體/衝上去近戰，或拉開到射程外（8m）。
import { Enemy } from './base.js';

const AIM_RANGE = 8; // 進入此距離開始瞄準開火
const KEEP_DIST = 3.5; // 想維持的距離（太近會後退）

export class Agent extends Enemy {
  constructor(o) {
    super({ ...o, type: 'agent', hp: 90, speed: 2.0, radius: 0.36 });
    this.headZoneMultiplier = 2.5; // 人類——爆頭更致命
  }

  hitSpheres() {
    return [
      { y: 0.95, r: 0.38, zone: 'body' },
      { y: 1.6, r: 0.2, zone: 'head' },
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
        if (d > AIM_RANGE) {
          const [tx, tz] = this.chaseTarget(ctx);
          this.moveToward(tx, tz, this.speed, dt, ctx.world);
        } else if (d < KEEP_DIST) {
          // 太近：後退拉開，同時面向玩家
          const bx = this.x + (this.x - ctx.player.x);
          const bz = this.z + (this.z - ctx.player.z);
          this.moveToward(bx, bz, this.speed * 1.1, dt, ctx.world);
          this.faceToward(ctx.player.x, ctx.player.z);
        } else {
          this.faceToward(ctx.player.x, ctx.player.z);
          if (this.stateTime > 0.25) this.setState('aim');
        }
        break;
      }
      case 'aim': // 瞄準前搖（給玩家躲避/搶攻的時間）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 0.6) this.setState('fire');
        break;
      case 'fire':
        if (this.stateTime === dt) {
          if (ctx.sound) ctx.sound('enemygun');
          // 射程與朝向內即命中（不做精確遮擋——玩家對策是拉開距離或繞遠）
          if (this.distTo(ctx.player.x, ctx.player.z) <= AIM_RANGE + 1) {
            ctx.attackPlayer(12);
          }
        }
        if (this.stateTime >= 0.15) this.setState('cooldown');
        break;
      case 'cooldown':
        // 開火後小幅走位再射
        if (this.distTo(ctx.player.x, ctx.player.z) > KEEP_DIST) this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 1.1) this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= 0.4) this.setState('chase');
        break;
    }
  }
}
