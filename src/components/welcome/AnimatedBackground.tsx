import { motion } from "framer-motion";
import { useMemo } from "react";

const AnimatedBackground = () => {
  // Generate random particles
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  );

  // Generate floating geometric shapes
  const shapes = useMemo(() => [
    { type: 'circle', x: 15, y: 20, size: 300, delay: 0 },
    { type: 'circle', x: 80, y: 70, size: 200, delay: 2 },
    { type: 'ring', x: 70, y: 25, size: 150, delay: 1 },
    { type: 'ring', x: 25, y: 75, size: 180, delay: 3 },
  ], []);

  // Generate grid lines
  const gridLines = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      isVertical: i < 10,
      position: (i % 10) * 10 + 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      {shapes.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: shape.type === 'circle' ? [0.03, 0.08, 0.03] : [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === 'circle' ? (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
          ) : (
            <div className="w-full h-full rounded-full border border-foreground/10" />
          )}
        </motion.div>
      ))}

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        {gridLines.map((line) => (
          <motion.div
            key={`grid-${line.id}`}
            className="absolute bg-foreground"
            style={line.isVertical ? {
              left: `${line.position}%`,
              top: 0,
              width: 1,
              height: '100%',
            } : {
              left: 0,
              top: `${line.position}%`,
              width: '100%',
              height: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 4,
              delay: line.id * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-foreground/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner Accents */}
      <svg className="absolute top-8 left-8 w-24 h-24 text-foreground/10" viewBox="0 0 100 100">
        <motion.path
          d="M 0 30 L 0 0 L 30 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>
      <svg className="absolute bottom-8 right-8 w-24 h-24 text-foreground/10 rotate-180" viewBox="0 0 100 100">
        <motion.path
          d="M 0 30 L 0 0 L 30 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        />
      </svg>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.line
          x1="10%"
          y1="20%"
          x2="40%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground/5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
        />
        <motion.line
          x1="90%"
          y1="30%"
          x2="60%"
          y2="60%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground/5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
        />
        <motion.line
          x1="20%"
          y1="80%"
          x2="50%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground/5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 6, delay: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
