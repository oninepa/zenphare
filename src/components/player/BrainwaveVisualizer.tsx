"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface BrainwaveVisualizerProps {
  isPlaying: boolean;
  musicStyle: "classic" | "ballad" | "jazz" | "meditation" | "rock";
  intensity: number;
}

export const BrainwaveVisualizer: React.FC<BrainwaveVisualizerProps> = ({
  isPlaying,
  musicStyle,
  intensity,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      life: number;
    }>
  >([]);

  const getStyleConfig = useCallback((style: string) => {
    const baseConfig = {
      classic: {
        frequency: 0.02,
        amplitude: 40,
        waveCount: 3,
        speed: 1,
        irregularity: 0,
        heartbeatMix: 0.3,
      },
      ballad: {
        frequency: 0.015,
        amplitude: 35,
        waveCount: 2,
        speed: 0.7,
        irregularity: 0.1,
        heartbeatMix: 0.4,
      },
      jazz: {
        frequency: 0.025,
        amplitude: 45,
        waveCount: 4,
        speed: 1.5,
        irregularity: 0.6,
        heartbeatMix: 0.2,
      },
      meditation: {
        frequency: 0.008,
        amplitude: 25,
        waveCount: 2,
        speed: 0.4,
        irregularity: 0,
        heartbeatMix: 0.6,
      },
      rock: {
        frequency: 0.035,
        amplitude: 60,
        waveCount: 5,
        speed: 2,
        irregularity: 0.8,
        heartbeatMix: 0.1,
      },
    };
    return baseConfig[style as keyof typeof baseConfig] || baseConfig.classic;
  }, []);

  const createParticle = useCallback((x: number, y: number) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      alpha: Math.random() * 0.5 + 0.5,
      life: Math.random() * 100 + 50,
    };
  }, []);

  const generateHeartbeatWave = useCallback(
    (x: number, time: number, intensity: number) => {
      const heartbeatFreq = (0.05 * intensity) / 100;
      const t = time * heartbeatFreq;
      const cycle = t % (2 * Math.PI);

      if (cycle < Math.PI * 0.3) {
        return Math.sin(cycle * 3.33) * 0.8;
      } else if (cycle < Math.PI * 0.5) {
        return Math.sin((cycle - Math.PI * 0.3) * 5) * 0.6;
      } else {
        return Math.sin((cycle - Math.PI * 0.5) * 0.5) * 0.2;
      }
    },
    []
  );

  const drawWave = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      time: number,
      waveIndex: number,
      config: any,
      intensity: number
    ) => {
      const centerY = height / 2;
      const points: Array<{ x: number; y: number }> = [];

      const intensityFactor = intensity / 100;
      const amplitude = config.amplitude * intensityFactor;

      for (let x = 0; x <= width; x += 2) {
        const normalizedX = x / width;

        // Base brainwave pattern
        let brainwave = 0;
        for (let i = 0; i < config.waveCount; i++) {
          const freq = config.frequency * (1 + i * 0.3);
          const phase = time * config.speed + waveIndex * 0.5;
          brainwave +=
            Math.sin(normalizedX * Math.PI * 2 * freq + phase) * (1 / (i + 1));
        }

        // Add heartbeat component
        const heartbeat =
          generateHeartbeatWave(x, time, intensity) * config.heartbeatMix;

        // Add irregularity for jazz/rock
        const irregularity =
          config.irregularity > 0
            ? Math.sin(normalizedX * 50 + time * 3) *
              Math.random() *
              config.irregularity
            : 0;

        const composite = (brainwave + heartbeat + irregularity) * amplitude;
        const y = centerY + composite + (waveIndex - 1) * 10;

        points.push({ x, y });
      }

      // Draw gradient wave
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (waveIndex === 0) {
        gradient.addColorStop(
          0,
          `rgba(141, 112, 83, ${0.6 * intensityFactor})`
        ); // Khaki
        gradient.addColorStop(
          1,
          `rgba(141, 112, 83, ${0.1 * intensityFactor})`
        );
      } else {
        gradient.addColorStop(0, `rgba(45, 80, 22, ${0.4 * intensityFactor})`); // Dark Green
        gradient.addColorStop(1, `rgba(45, 80, 22, ${0.05 * intensityFactor})`);
      }

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2 + waveIndex;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      // Smooth curve using quadratic curves
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      ctx.stroke();

      // Add glow effect
      ctx.shadowColor = waveIndex === 0 ? "#8D7053" : "#2D5016";
      ctx.shadowBlur = 10 * intensityFactor;
      ctx.stroke();
      ctx.shadowBlur = 0;

      return points;
    },
    [generateHeartbeatWave]
  );

  const updateParticles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      intensity: number
    ) => {
      const particles = particlesRef.current;

      // Add new particles based on intensity
      if (Math.random() < intensity / 1000) {
        particles.push(
          createParticle(
            Math.random() * width,
            height / 2 + (Math.random() - 0.5) * 100
          )
        );
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha *= 0.995;
        particle.life--;

        if (particle.life <= 0 || particle.alpha < 0.01) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = "#8D7053";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    },
    [createParticle]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas with subtle background
    const bgGradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width / 2
    );
    bgGradient.addColorStop(0, "rgba(249, 249, 249, 0.1)");
    bgGradient.addColorStop(1, "rgba(249, 249, 249, 0.02)");

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    if (isPlaying) {
      timeRef.current += 1;

      const config = getStyleConfig(musicStyle);

      // Draw multiple wave layers
      for (let i = 0; i < Math.min(3, config.waveCount); i++) {
        drawWave(ctx, width, height, timeRef.current, i, config, intensity);
      }

      // Update particles
      updateParticles(ctx, width, height, intensity);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [
    isPlaying,
    musicStyle,
    intensity,
    getStyleConfig,
    drawWave,
    updateParticles,
  ]);

  useEffect(() => {
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Reset particles when changing styles or stopping
  useEffect(() => {
    if (!isPlaying) {
      particlesRef.current = [];
      timeRef.current = 0;
    }
  }, [isPlaying, musicStyle]);

  return (
    <div className="relative w-full h-full min-h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter: isPlaying ? "none" : "brightness(0.7) saturate(0.8)",
          transition: "filter 0.5s ease",
        }}
      />

      {/* Overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center pulse effect */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            w-4 h-4 rounded-full bg-primary/30 transition-all duration-1000 ${
              isPlaying ? "animate-ping" : "opacity-0"
            }`}
          style={{
            animationDuration:
              musicStyle === "meditation"
                ? "3s"
                : musicStyle === "rock"
                ? "0.8s"
                : "2s",
          }}
        />

        {/* Corner gradients */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-xl" />
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <div
          className={`flex items-center gap-2 text-sm font-medium transition-opacity ${
            isPlaying
              ? "text-primary opacity-100"
              : "text-muted-foreground opacity-60"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              isPlaying ? "bg-primary animate-pulse" : "bg-muted-foreground/50"
            }`}
          />
          {isPlaying ? "Active" : "Paused"}
        </div>
      </div>
    </div>
  );
};
