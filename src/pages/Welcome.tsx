import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/welcome/AnimatedBackground";
import AnimatedLogo from "@/components/welcome/AnimatedLogo";
import EnterButton from "@/components/welcome/EnterButton";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center relative overflow-hidden">
      <SEO
        title="Calculator Page - Professional Financial Calculators & Tools"
        description="Free professional calculators for finance, budgeting, retirement planning, and unit conversions. Calculate compound interest, mortgages, and more."
        keywords="calculator, financial calculator, compound interest, mortgage calculator, retirement calculator"
        canonicalUrl="https://www.thecalculatorpage.com/"
      />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.07]"
          style={{ background: "linear-gradient(135deg, #3B82F6, #a78bfa)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.05]"
          style={{ background: "linear-gradient(135deg, #F97316, #ef4444)" }} />
      </div>

      {/* Animated Background (sub-component — preserved) */}
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
          className="text-[9px] font-heading tracking-[0.4em] text-white/20 uppercase"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>

      {/* Left decorative lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-px bg-white/10"
            style={{ width: 32 }}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* Right decorative lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-px bg-white/10"
            style={{ width: 32 }}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, delay: 0.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* Corner branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden md:block"
      >
        <p className="text-[9px] font-heading uppercase tracking-[0.3em] text-white/15">
          Calculator Page
        </p>
      </motion.div>

      {/* Top-left subtle grid label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute top-8 left-8 hidden md:flex items-center gap-2"
      >
        <div className="w-4 h-px bg-white/15" />
        <p className="text-[9px] font-heading uppercase tracking-[0.3em] text-white/15">Est. 2024</p>
      </motion.div>
    </div>
  );
};

export default Welcome;