import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EnterButton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/home"
        className="group relative inline-flex items-center justify-center"
      >
        {/* Outer glow ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-primary/5 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating border */}
        <motion.span
          className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ padding: 1 }}
        />

        {/* Button content */}
        <motion.span
          className="relative z-10 px-12 py-4 flex items-center gap-3 text-xs tracking-[0.3em] uppercase font-medium text-foreground bg-background border border-foreground/10 rounded-full overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Hover background sweep */}
          <motion.span
            className="absolute inset-0 bg-foreground"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Text */}
          <span className="relative z-10 group-hover:text-background transition-colors duration-300">
            Enter
          </span>

          {/* Arrow icon */}
          <motion.span
            className="relative z-10 group-hover:text-background transition-colors duration-300"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default EnterButton;
