import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className, light }: LogoProps) {
  return (
    <Link to="/" className={cn("flex items-center gap-3 group", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
      >
        {/* Placeholder for uploaded Logo icon. 
            Once uploaded, replace this block with an <img src="/logo-icon.png" /> */}
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2 border-emerald",
          light ? "border-white/90 text-white" : "border-emerald text-emerald group-hover:border-emerald-bright"
        )}>
          <Globe className="w-6 h-6 stroke-[1.5]" />
          {/* Faux swoosh/orbit placeholder */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-gold opacity-50 scale-125"
            style={{ borderRadius: "50% 50% 50% 50% / 30% 70% 30% 70%" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
      <div className="flex flex-col">
        <span className={cn(
          "font-heading font-bold text-lg leading-none tracking-tight",
          light ? "text-white" : "text-charcoal group-hover:text-emerald"
        )}>
          NEXSTATE
        </span>
        <span className={cn(
          "font-sans font-semibold text-[0.6rem] tracking-[0.2em] leading-none uppercase mt-1",
          light ? "text-white/70" : "text-emerald/80"
        )}>
          Corporation
        </span>
      </div>
    </Link>
  );
}
