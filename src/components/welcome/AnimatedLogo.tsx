import { motion } from "framer-motion";

// Animated geometric logo icon
const AnimatedLogoIcon = () => {
  return (
    <motion.svg
      width={100}
      height={100}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Triangle frame */}
      <motion.path
        d="M20 4L36 34H4L20 4Z"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      />
      {/* Vertical line */}
      <motion.line
        x1="20"
        y1="12"
        x2="20"
        y2="28"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      />
      {/* Small circle accent */}
      <motion.circle
        cx="20"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth={1}
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

const AnimatedLogo = () => {
  const theText = "The";
  const calculatorText = "Calculator";
  const pageText = "Page";

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: 0.8 + i * 0.04,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-6 relative">
      {/* Glow effect behind logo */}
      <motion.div
        variants={glowVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"
      />

      {/* Top decorative line */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center gap-4"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px bg-gradient-to-r from-transparent to-foreground/30 origin-right"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-xs tracking-[0.5em] text-muted-foreground uppercase font-light"
        >
          Est. 2024
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px bg-gradient-to-l from-transparent to-foreground/30 origin-left"
        />
      </motion.div>

      {/* Logo Icon */}
      <AnimatedLogoIcon />

      {/* Main logo text - horizontal layout */}
      <div className="flex flex-col items-center perspective-[1000px]">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground text-center leading-none overflow-hidden">
          <span className="flex justify-center items-baseline gap-2 sm:gap-3" style={{ perspective: '1000px' }}>
            {/* "The" */}
            {theText.split("").map((letter, i) => (
              <motion.span
                key={`the-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block relative font-light"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letter}
              </motion.span>
            ))}
            {/* Space */}
            <span className="w-2 sm:w-3" />
            {/* "Calculator" */}
            {calculatorText.split("").map((letter, i) => (
              <motion.span
                key={`calc-${i}`}
                custom={i + theText.length}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block relative"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.1,
                  color: 'hsl(var(--primary))',
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
            {/* Space */}
            <span className="w-2 sm:w-3" />
            {/* "Page" */}
            {pageText.split("").map((letter, i) => (
              <motion.span
                key={`page-${i}`}
                custom={i + theText.length + calculatorText.length}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block relative font-bold"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>
      </div>

      {/* Decorative line under logo */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent mt-2"
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="text-sm sm:text-base tracking-[0.4em] text-muted-foreground uppercase mt-2 font-light"
      >
        Financial Tools & Calculators
      </motion.p>

      {/* Animated dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="flex gap-2 mt-4"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-foreground/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;
