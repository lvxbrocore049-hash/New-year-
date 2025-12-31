
import React, { useEffect, useRef } from 'react';
import { Particle, Firework } from '../types';
import { audio } from '../audioService';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const fireworks: Firework[] = [];
    const colors = ['#A855F7', '#3B82F6', '#D946EF', '#6366F1', '#EC4899'];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticles = (x: number, y: number, color: string): Particle[] => {
      const particles: Particle[] = [];
      const count = 80;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2 + 1,
          gravity: 0.05,
          friction: 0.96
        });
      }
      return particles;
    };

    const createFirework = (): Firework => {
      const x = Math.random() * width;
      const y = height;
      const targetY = Math.random() * (height * 0.5);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Play launch sound
      audio.playLaunch();
      
      return {
        x,
        y,
        targetY,
        color,
        speed: 4 + Math.random() * 3,
        particles: [],
        exploded: false
      };
    };

    const update = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.03) { // Slightly reduced frequency for better audio clarity
        fireworks.push(createFirework());
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const f = fireworks[i];

        if (!f.exploded) {
          f.y -= f.speed;
          
          ctx.beginPath();
          ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();

          if (f.y <= f.targetY) {
            f.exploded = true;
            f.particles = createParticles(f.x, f.y, f.color);
            // Play explosion sound
            audio.playExplosion();
          }
        } else {
          for (let j = f.particles.length - 1; j >= 0; j--) {
            const p = f.particles[j];
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;

            if (p.alpha <= 0) {
              f.particles.splice(j, 1);
            } else {
              ctx.save();
              ctx.globalAlpha = p.alpha;
              ctx.fillStyle = p.color;
              ctx.shadowBlur = 10;
              ctx.shadowColor = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          if (f.particles.length === 0) {
            fireworks.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default Fireworks;
