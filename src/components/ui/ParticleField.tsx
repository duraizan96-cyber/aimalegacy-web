// CSS-only particle field — replaces Three.js (~230KB gzipped savings)
// Renders 30 animated dots with randomized positions, sizes and animation delays
// using only CSS keyframes. Zero JS runtime cost, zero WebGL dependency.

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  duration: 6 + (i % 7),
  delay: -(i * 0.7),
  opacity: i % 4 === 0 ? 0.7 : i % 4 === 1 ? 0.5 : i % 4 === 2 ? 0.35 : 0.25,
}))

// Sparse connecting lines — CSS-only, purely decorative
const LINES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${(i * 43 + 15) % 85}%`,
  top: `${(i * 29 + 20) % 75}%`,
  width: `${80 + (i * 31) % 120}px`,
  rotate: `${(i * 22) % 180}deg`,
  duration: 9 + (i % 5),
  delay: -(i * 1.1),
}))

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dots */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: '#533afd',
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Lines */}
      {LINES.map((l) => (
        <span
          key={l.id}
          style={{
            position: 'absolute',
            left: l.left,
            top: l.top,
            width: l.width,
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(5,181,212,0.25), transparent)',
            transform: `rotate(${l.rotate})`,
            transformOrigin: 'left center',
            animation: `particle-fade ${l.duration}s ${l.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Radial gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #05061a 70%)',
        }}
      />

      <style>{`
        @keyframes particle-float {
          from { transform: translateY(0px) translateX(0px); }
          to   { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes particle-fade {
          from { opacity: 0.05; }
          to   { opacity: 0.22; }
        }
      `}</style>
    </div>
  )
}
