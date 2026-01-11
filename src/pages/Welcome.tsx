import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/welcome/AnimatedBackground";
import AnimatedLogo from "@/components/welcome/AnimatedLogo";
import EnterButton from "@/components/welcome/EnterButton";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <SEO
        title="Calculator Page - Professional Financial Calculators & Tools"
        description="Free professional calculators for finance, budgeting, retirement planning, and unit conversions. Calculate compound interest, mortgages, and more."
        keywords="calculator, financial calculator, compound interest, mortgage calculator, retirement calculator"
        canonicalUrl="https://thecalculatorpage.com/"
      />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center gap-16 px-8"
      >
        {/* Logo */}
        <AnimatedLogo />

        {/* Enter button */}
        <EnterButton />
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span
          className="text-[10px] tracking-[0.3em] text-muted-foreground/50 uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent"
        />
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-8 h-px bg-foreground/10"
            animate={{
              scaleX: [0.3, 1, 0.3],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-8 h-px bg-foreground/10"
            animate={{
              scaleX: [0.3, 1, 0.3],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              delay: 0.5 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Welcome;
