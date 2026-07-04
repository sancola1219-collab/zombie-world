// WebAudio 合成音效：零外部音檔。AudioContext 需使用者手勢後建立（unlock）。
// ctx 尚未建立時所有播放都安靜跳過。
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this._noise = null;
  }

  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
      this._startAmbient();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  play(name) {
    if (!this.ctx) return;
    if (name === 'step') this._step();
    else if (name === 'door') this._door();
    else if (name === 'locked') this._locked();
  }

  _noiseBuffer() {
    if (this._noise) return this._noise;
    const len = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    this._noise = buf;
    return buf;
  }

  // 短促低頻噪音：腳步
  _step() {
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer();
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 320;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    src.connect(f);
    f.connect(gain);
    gain.connect(this.master);
    src.start(t, Math.random() * 0.6, 0.13);
  }

  // 低頻悶響＋吱呀掃頻：開關門
  _door() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.5);
    const og = this.ctx.createGain();
    og.gain.setValueAtTime(0.06, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    osc.connect(og);
    og.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.6);

    const thud = this.ctx.createBufferSource();
    thud.buffer = this._noiseBuffer();
    const tf = this.ctx.createBiquadFilter();
    tf.type = 'lowpass';
    tf.frequency.value = 140;
    const tg = this.ctx.createGain();
    tg.gain.setValueAtTime(0.5, t);
    tg.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    thud.connect(tf);
    tf.connect(tg);
    tg.connect(this.master);
    thud.start(t, Math.random() * 0.5, 0.3);
  }

  // 金屬雙 click：上鎖的門
  _locked() {
    const t = this.ctx.currentTime;
    for (const dt of [0, 0.13]) {
      const osc = this.ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = 900 + dt * 800;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.08, t + dt);
      g.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.05);
      osc.connect(g);
      g.connect(this.master);
      osc.start(t + dt);
      osc.stop(t + dt + 0.06);
    }
  }

  // 低沉環境音：棕噪音＋緩慢起伏
  _startAmbient() {
    const src = this.ctx.createBufferSource();
    const len = this.ctx.sampleRate * 4;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + (Math.random() * 2 - 1) * 0.02) * 0.998;
      data[i] = last * 3.5;
    }
    src.buffer = buf;
    src.loop = true;
    const f = this.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 220;
    const g = this.ctx.createGain();
    g.gain.value = 0.16;
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start();
    lfo.start();
  }
}
