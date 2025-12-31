
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  gravity: number;
  friction: number;
}

export interface Firework {
  x: number;
  y: number;
  targetY: number;
  color: string;
  speed: number;
  particles: Particle[];
  exploded: boolean;
}
