/**
 * Audio Service - Programmatic UI Sound Engine
 * Uses Web Audio API to generate surgical high-tech sounds.
 */

class AudioService {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    createOscillator(freq, type = 'sine', duration = 0.1, volume = 0.1) {
        if (!this.enabled || !this.ctx) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playScan() {
        this.init();
        // High-low-high pulse
        this.createOscillator(800, 'sine', 0.05, 0.05);
        setTimeout(() => this.createOscillator(1200, 'sine', 0.05, 0.05), 50);
    }

    playHover() {
        this.init();
        this.createOscillator(2000, 'triangle', 0.02, 0.02);
    }

    playDecode() {
        this.init();
        // Rapid succession of random micro-beeps
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createOscillator(1500 + Math.random() * 500, 'square', 0.01, 0.01);
            }, i * 30);
        }
    }

    playClick() {
        this.init();
        this.createOscillator(400, 'sine', 0.05, 0.08);
    }
}

export const audioService = new AudioService();
