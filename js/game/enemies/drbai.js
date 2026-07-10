// 白博士・藍囊教父（醫院篇 ch24 終章魔王）：白博士自我注射 KY 改良型後的形態。
// 脊椎拉長、雙手化為針管觸手、胸口浮出三顆藍色囊泡（＝頭部要害判定，打囊最痛）。
// 遠程：針管射出（中毒）；近戰：觸手橫掃；每損失 1/3 血量進入下一階段（加速＋縮短冷卻）。
// 可以被擊殺——他是醫院篇的終點，也是聖時故事的引信。
import { Enemy } from './base.js';

export class Drbai extends Enemy {
  constructor(o) {
    super({ ...o, type: 'drbai', hp: 1500, speed: 2.0, radius: 0.55 });
    this.headZoneMultiplier = 2.6; // 胸口藍囊＝要害
    this.phase = 1;
    this._needleCd = 3;
  }

  hitSpheres() {
    return [
      { y: 1.1, r: 0.6, zone: 'body' },
      { y: 1.55, r: 0.32, zone: 'head' }, // 胸口三顆藍囊（位置偏低的「頭部」判定）
    ];
  }

  hurt(damage, zone = 'body') {
    if (this.dead) return 0;
    this.alerted = true;
    const dmg = zone === 'head' ? damage * this.headZoneMultiplier : damage;
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.dead = true;
      this.setState('dead');
      return dmg;
    }
    // 每破一顆藍囊（1/3 血）進入下一階段
    const ph = this.hp > 1000 ? 1 : this.hp > 500 ? 2 : 3;
    if (ph > this.phase) {
      this.phase = ph;
      this.speed = 2.0 + ph * 0.5;
      this.setState('roar');
    } else if (dmg >= 90 && this.state !== 'roar') {
      this.setState('stagger'); // 只有重擊能打斷
    }
    return dmg;
  }

  think(dt, ctx) {
    const d = this.distTo(ctx.player.x, ctx.player.z);
    if (!this.alerted) {
      if (d < 14) this.alert();
      else return;
    }
    switch (this.state) {
      case 'idle':
        this.setState('chase');
        break;
      case 'chase': {
        this._needleCd -= dt;
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        if (d < 2.4) this.setState('sweep');
        else if (d < 11 && this._needleCd <= 0) this.setState('aimneedle');
        break;
      }
      case 'aimneedle': // 針管觸手瞄準（前搖）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= (this.phase >= 3 ? 0.45 : 0.65)) this.setState('needle');
        break;
      case 'needle': // 針管射出：命中則傷害＋中毒
        if (this.stateTime === dt) {
          if (ctx.sound) ctx.sound('bite');
          if (this.distTo(ctx.player.x, ctx.player.z) < 12) {
            ctx.attackPlayer(14);
            if (ctx.poison) ctx.poison(5);
          }
        }
        if (this.stateTime >= 0.25) {
          this._needleCd = this.phase >= 3 ? 1.6 : this.phase === 2 ? 2.4 : 3.2;
          this.setState('chase');
        }
        break;
      case 'sweep': // 觸手橫掃
        if (this.stateTime >= 0.4) {
          if (this.distTo(ctx.player.x, ctx.player.z) < 2.9) ctx.attackPlayer(26 + this.phase * 4);
          this.setState('recover');
        }
        break;
      case 'roar': // 破囊怒吼（階段轉換）
        if (this.stateTime === dt && ctx.sound) ctx.sound('groan');
        if (this.stateTime >= 1.0) this.setState('chase');
        break;
      case 'recover':
        if (this.stateTime >= 0.8) this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= 0.5) this.setState('chase');
        break;
    }
  }
}
