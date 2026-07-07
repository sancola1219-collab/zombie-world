// 聖時爆君（S-10 戰術適應體）：第四章大魔王。原始宿主為晨星工業鎮壓小隊隊長。
// 三公尺高、手持火箭筒、保有戰術智力——不是失控亂吼，而是「觀察、判斷、處決」。
// 設計為「無法正面擊殺的追殺型 Boss」：血量極高、裝甲化（普通傷難以打斷），
// 玩家的正解是逃亡＋用環境機關（物料提升機配重）拖住他，而非硬拚。
// 遠程：火箭筒（前搖久、可躲、爆炸範圍傷害）；近戰：工業夾爪左臂重擊。
// 半血後進入狂暴——加速、火箭冷卻縮短。
import { Enemy } from './base.js';

const ROCKET_RANGE = 14; // 火箭射程
const SMASH_RANGE = 2.8; // 巨臂重擊距離

export class Warlord extends Enemy {
  constructor(o) {
    super({ ...o, type: 'warlord', hp: 2400, speed: 2.8, radius: 0.8 });
    this.headZoneMultiplier = 1.4; // 裝甲化頭部，爆頭收益低
    this.phase = 1;
    this._rocketCd = 4;
    this._stepCd = 0;
    this._staggerArmor = 100; // 單發需 ≥100 傷才會打斷動作
  }

  hitSpheres() {
    return [
      { y: 1.5, r: 0.85, zone: 'body' },
      { y: 2.55, r: 0.42, zone: 'head' },
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
    // 半血狂暴：加速、火箭更頻繁
    if (this.phase === 1 && this.hp <= 1200) {
      this.phase = 2;
      this.speed = 3.4;
      this.setState('roar');
      return dmg;
    }
    // 裝甲：只有重擊（麥格農／霰彈近距／火箭）能打斷，且不在發射/爆裂動作中
    if (dmg >= this._staggerArmor && this.state !== 'launch' && this.state !== 'impact') {
      this.setState('stagger');
    }
    return dmg;
  }

  think(dt, ctx) {
    const d = this.distTo(ctx.player.x, ctx.player.z);
    if (!this.alerted) {
      if (d < 16) this.alert();
      else return;
    }
    // 沉重腳步（壓迫感）——只在追擊移動時，靠計時器節奏，不依賴動畫
    if (this.state === 'chase') {
      this._stepCd -= dt;
      if (this._stepCd <= 0) {
        this._stepCd = this.phase === 2 ? 0.45 : 0.6;
        if (ctx.sound) ctx.sound('stomp');
      }
    }

    switch (this.state) {
      case 'idle':
        this.setState('chase');
        break;
      case 'chase': {
        this._rocketCd -= dt;
        const [tx, tz] = this.chaseTarget(ctx);
        this.moveToward(tx, tz, this.speed, dt, ctx.world);
        if (d < SMASH_RANGE) this.setState('windup');
        else if (d < ROCKET_RANGE && this._rocketCd <= 0) this.setState('aim');
        break;
      }
      case 'aim': // 舉起火箭筒瞄準（前搖久——給玩家找掩體／閃避的時間）
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= (this.phase === 2 ? 0.75 : 1.0)) this.setState('launch');
        break;
      case 'launch': // 發射瞬間
        if (this.stateTime === dt && ctx.sound) ctx.sound('rocketLaunch');
        this._aimX = ctx.player.x;
        this._aimZ = ctx.player.z;
        if (this.stateTime >= 0.3) this.setState('impact');
        break;
      case 'impact': // 火箭命中：爆炸（視覺＋濺射），瞄準點附近才吃滿傷
        if (this.stateTime === dt) {
          if (ctx.boom) ctx.boom(this._aimX, 0.6, this._aimZ);
          const hit = Math.hypot(ctx.player.x - this._aimX, ctx.player.z - this._aimZ);
          if (hit < 2.6) ctx.attackPlayer(hit < 1.2 ? 45 : 26);
        }
        this._rocketCd = this.phase === 2 ? 2.6 : 3.8;
        if (this.stateTime >= 0.4) this.setState('chase');
        break;
      case 'windup': // 巨臂重擊前搖
        this.faceToward(ctx.player.x, ctx.player.z);
        if (this.stateTime >= 0.5) this.setState('smash');
        break;
      case 'smash':
        if (this.stateTime === dt && ctx.sound) ctx.sound('groan');
        if (this.stateTime >= 0.18) {
          if (this.distTo(ctx.player.x, ctx.player.z) < SMASH_RANGE + 0.3) ctx.attackPlayer(50);
          this.setState('recover');
        }
        break;
      case 'roar': // 狂暴轉換咆哮
        if (this.stateTime === dt && ctx.sound) ctx.sound('groan');
        if (this.stateTime >= 1.1) this.setState('chase');
        break;
      case 'recover':
        if (this.stateTime >= 0.7) this.setState('chase');
        break;
      case 'stagger':
        if (this.stateTime >= 0.5) this.setState('chase');
        break;
    }
  }
}
