import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import CustomCursor from "../components/layout/CustomCursor";
import { 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Cpu, 
  Sparkles,
  X 
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const stats = [
  { value: "08+", label: "Years of Excellence" },
  { value: "45+", label: "Enterprise Projects" },
  { value: "100%", label: "Local Compliance" },
  { value: "24/7", label: "Global Operations" }
];

const corePillars = [
  {
    icon: Cpu,
    title: "Sovereign Engineering",
    desc: "Designing and developing robust national infrastructure systems, custom software platforms, and secure digital foundations for governments and local enterprises."
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    desc: "Bridging the gap between international stakeholders and local opportunities through world-class business process outsourcing and execution strategy."
  },
  {
    icon: Layers,
    title: "Strategic Capital",
    desc: "Advising on deal structuring, financial models, and strategic joint-ventures that mobilize local resources and empower cross-border investments."
  }
];

const credentials = [
  { title: "National e-GP Registered", detail: "Fully qualified and registered under national Electronic Government Procurement" },
  { title: "BASIS Corporate Member", detail: "Proud member of the Bangladesh Association of Software and Information Services" },
  { title: "Licensed Technical Contractor", detail: "Authorized provider of large-scale public and private infrastructure engineering" },
  { title: "BCS Corporate Member", detail: "Active corporate member of Bangladesh Computer Samity" },
  { title: "ISO Quality Alignment", detail: "Committed to the rigorous framework of ISO 9001:2015 & ISO 27001 standards" }
];

interface MobileDetail {
  title: string;
  desc: string;
  icon?: any;
  logoSrc?: string;
  fallbackText?: string;
  type: "pillar" | "sister" | "credential";
}

function BackDeskLogo({ className = "h-10 sm:h-20" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-4 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full aspect-square shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 22 L22 50 L50 78" stroke="#7ecbd4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 78 L78 50 L50 22" stroke="#d5f3f7" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="22" r="9" fill="#7ecbd4" />
        <circle cx="22" cy="50" r="9" fill="#7ecbd4" />
        <circle cx="50" cy="78" r="9" fill="#7ecbd4" />
      </svg>
      <div className="text-left">
        <div className="font-sans font-bold text-base sm:text-2xl tracking-tight leading-none text-white">
          BackDesk
        </div>
        <div className="text-[#7fd1df] font-sans font-medium text-[8px] sm:text-xs block tracking-[0.25em] uppercase mt-1.5 leading-none">
          SOLUTIONS
        </div>
      </div>
    </div>
  );
}

function CareerLogo({ className = "h-10 sm:h-20" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-4 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full aspect-square shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 65,23 L 35,23 L 21,37 L 21,41 Q 21,59 39,59 L 65,59 L 65,47" stroke="white" strokeWidth="8.5" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="M 43,41 L 59,41 Q 77,41 77,59 Q 77,77 59,77 L 43,77 L 43,65" stroke="white" strokeWidth="8.5" strokeLinecap="butt" strokeLinejoin="miter" />
      </svg>
      <div className="text-left font-sans font-bold leading-[1.1] tracking-wide text-white">
        <div className="text-[11px] sm:text-base font-black">CAREER</div>
        <div className="text-[11px] sm:text-base font-black">DEVELOPERS</div>
        <div className="text-[11px] sm:text-base font-black text-blue-200">BANGLADESH</div>
      </div>
    </div>
  );
}

export default function About() {
  const [activeDetail, setActiveDetail] = useState<MobileDetail | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <CustomCursor theme="light" />
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Hero Header Section */}
        <section className="mb-24 relative">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants} 
            className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start"
          >
            <div className="lg:col-span-7">
              <motion.span 
                variants={fadeUp} 
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald font-mono text-xs uppercase tracking-widest mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Who We Are
              </motion.span>
              
              <motion.h1 
                variants={fadeUp} 
                className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.1] mb-8"
              >
                A Partner in <br />
                <span className="text-emerald font-black">National Ambition.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeUp} 
                className="font-sans text-lg md:text-xl text-soft-text leading-relaxed max-w-2xl font-light"
              >
                Our mission is clear: we build the very systems that Bangladesh runs on, and we open its tremendous opportunity to the rest of the world.
              </motion.p>
            </div>

            <div className="lg:col-span-5 lg:pt-16">
              <motion.div 
                variants={fadeUp} 
                className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-charcoal/5 shadow-[0_8px_30px_rgb(0,0,0,0.02)] grid grid-cols-2 gap-6 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/10 rounded-full blur-2xl" />
                {stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-heading font-extrabold text-3xl md:text-4xl text-emerald">{stat.value}</span>
                    <span className="font-sans text-xs md:text-sm text-soft-text mt-1">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Brand Narrative Section */}
        <section className="mb-28">
          <div className="grid md:grid-cols-12 gap-8 items-center border-t border-charcoal/10 pt-16">
            <div className="md:col-span-4">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal tracking-tight">
                Operating at the Critical Intersection
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="space-y-6 text-soft-text text-base md:text-lg font-light leading-relaxed">
                <p>
                  Nexstate Corporation was founded on a simple principle: modern nations are built on resilient systems and decisive investments. As Bangladesh accelerates its growth, the demand for both has never been higher.
                </p>
                <p>
                  We provide the technology engineering needed by local organizations to scale their services, while simultaneously serving as the trusted on-the-ground advisor for international firms ready to enter the market. Every line of code we deploy and every operation we establish serves to build a stronger economic foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Pillars / Capabilities */}
        <section className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald font-bold mb-3 block">
              Core Pillars
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-charcoal">
              How We Drive Growth
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setActiveDetail({
                      title: pillar.title,
                      desc: pillar.desc,
                      icon: Icon,
                      type: "pillar"
                    });
                  }}
                  className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-charcoal/5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between relative select-none cursor-pointer active:scale-[0.98] duration-200"
                >
                  <div>
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-ivory flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-emerald" />
                    </div>
                    <h3 className="font-heading font-bold text-[11px] sm:text-lg md:text-xl text-charcoal mb-1.5 sm:mb-3 group-hover:text-emerald transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    
                    {!isMobile && (
                      <p className="font-sans text-[10px] sm:text-xs md:text-sm text-soft-text leading-relaxed mt-3 sm:mt-4">
                        {pillar.desc}
                      </p>
                    )}
                  </div>

                  {/* Subtle indication that it's interactive on mobile */}
                  {isMobile && (
                    <div className="absolute bottom-3 right-3 text-emerald/40 group-hover:text-emerald transition-colors">
                      <motion.svg 
                        className="w-3 h-3 sm:w-4 sm:h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Sister Concerns */}
        <section className="mb-28 bg-white/80 border border-charcoal/5 rounded-3xl p-8 md:p-14 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald font-semibold mb-2 block">
              Synergized Ecosystem
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-charcoal mb-4">
              Our Ecosystem
            </h2>
            <p className="font-sans text-sm md:text-base text-soft-text">
              Nexstate Corporation anchors a group of specialist companies — extending our capabilities from technology and advisory into outsourcing and workforce development.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {/* Backdesk Solutions */}
            {(() => {
              const descText = "Providing specialized Business Process Outsourcing (BPO) and Knowledge Process Outsourcing (KPO) services exclusively structured to meet operational demands globally.";
              return (
                <motion.div 
                  initial="hidden"
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  onClick={() => {
                    setActiveDetail({
                      title: "Backdesk Solutions",
                      desc: descText,
                      logoSrc: "/backdesk_logo.png",
                      fallbackText: "BackDesk Solutions",
                      type: "sister"
                    });
                  }}
                  className="bg-[#112e36] hover:bg-[#153a44] p-4 sm:p-6 md:p-8 rounded-2xl border border-[#235864]/30 shadow-lg hover:shadow-cyan-950/20 select-none transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer active:scale-[0.98] duration-200"
                >
                  <div className="absolute inset-0 bg-radial-at-t from-[#205763]/20 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                  <div className="relative z-10 flex flex-col h-full w-full">
                    <div className="mb-2 sm:mb-4 flex justify-start items-center h-10 sm:h-20 shrink-0">
                      <BackDeskLogo className="h-10 sm:h-20" />
                    </div>

                    {!isMobile && (
                      <p className="font-sans text-[10px] sm:text-xs md:text-sm text-slate-300 leading-relaxed mb-4 group-hover:text-white transition-colors mt-2 sm:mt-4">
                        {descText}
                      </p>
                    )}
                    
                    <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-mono uppercase tracking-wider text-[#7fd1df] font-bold group-hover:text-white transition-colors relative z-10 mt-auto">
                      Learn More <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              );
            })()}

            {/* Career Developers Bangladesh */}
            {(() => {
              const descText = "A dedicated training organization focused on upskilling the modern workforce to meet the standards required by global systems.";
              return (
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  variants={fadeUp} 
                  transition={{ delay: 0.1 }}
                  onClick={() => {
                    setActiveDetail({
                      title: "Career Developers Bangladesh",
                      desc: descText,
                      logoSrc: "/career_logo.png",
                      fallbackText: "Career Developers",
                      type: "sister"
                    });
                  }}
                  className="bg-gradient-to-br from-[#0a42d9] to-[#041f7a] hover:from-[#0d4cf9] hover:to-[#052899] p-4 sm:p-6 md:p-8 rounded-2xl border border-[#1e50ff]/30 shadow-lg hover:shadow-blue-950/30 select-none transition-all duration-300 flex flex-col justify-start group relative overflow-hidden cursor-pointer active:scale-[0.98] duration-200"
                >
                  <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="cardSkyscraperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M -50,350 L 150,-50 L 190,-50 L -10,350 Z" fill="url(#cardSkyscraperGrad)" />
                      <path d="M 50,350 L 250,-50 L 290,-50 L 90,350 Z" fill="url(#cardSkyscraperGrad)" />
                      <path d="M 150,350 L 350,-50 L 390,-50 L 190,350 Z" fill="url(#cardSkyscraperGrad)" />
                      
                      <line x1="-50" y1="350" x2="350" y2="-50" stroke="#ffffff" strokeWidth="1.5" />
                      <line x1="0" y1="350" x2="400" y2="-50" stroke="#ffffff" strokeWidth="2" />
                      <line x1="50" y1="350" x2="450" y2="-50" stroke="#ffffff" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-radial-at-t from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full w-full">
                    <div className="mb-2 sm:mb-4 flex justify-start items-center h-10 sm:h-20 shrink-0">
                      <CareerLogo className="h-10 sm:h-20" />
                    </div>

                    {!isMobile && (
                      <p className="font-sans text-[10px] sm:text-xs md:text-sm text-blue-100/90 leading-relaxed group-hover:text-white transition-colors mt-2 sm:mt-4 mb-4">
                        {descText}
                      </p>
                    )}
                    
                    <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-mono uppercase tracking-wider text-blue-200 font-bold group-hover:text-white transition-colors relative z-10 mt-auto">
                      Learn More <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </section>

        {/* Credentials Block */}
        <section>
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp} 
            className="bg-charcoal text-ivory p-6 sm:p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            {/* Background glowing shapes */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-12 right-12 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <ShieldCheck className="w-6 h-6 text-gold" />
                <h2 className="font-heading font-bold text-xl md:text-2xl text-white">
                  Corporate Credentials & Standards
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-6">
                {credentials.map((cred, idx) => {
                  return (
                    <motion.div 
                      key={idx} 
                      onClick={() => {
                        setActiveDetail({
                          title: cred.title,
                          desc: cred.detail,
                          type: "credential"
                        });
                      }}
                      className="flex gap-2 sm:gap-4 items-start group p-2 sm:p-3 rounded-xl border border-transparent transition-all duration-300 select-none cursor-pointer active:scale-[0.98] duration-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald/20 border border-emerald/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald/40 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-soft" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-semibold text-xs sm:text-sm md:text-base text-white tracking-tight leading-snug group-hover:text-gold-soft transition-colors">
                          {cred.title}
                        </h4>
                        {!isMobile && (
                          <p className="font-sans text-[10px] sm:text-xs md:text-sm text-white/60 leading-relaxed font-light mt-1">
                            {cred.detail}
                          </p>
                        )}
                      </div>
                      
                      {/* Subtle chevron indicator */}
                      {isMobile && (
                        <div className="text-white/20 group-hover:text-white/50 transition-colors self-center shrink-0">
                          <motion.svg 
                            className="w-3 h-3" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-28 text-center max-w-3xl mx-auto py-12">
          <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            Ready to Accelerate Growth?
          </h3>
          <p className="font-sans text-soft-text text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Partner with Nexstate Corporation to explore high-impact investment advisory, market entry support, and advanced technology engineering.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest text-white bg-emerald hover:bg-emerald-deep transition-all duration-300 shadow-[0_10px_20px_rgba(12,90,67,0.15)] hover:shadow-[0_15px_30px_rgba(12,90,67,0.25)]"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>

      {/* Details Pop-out Modal */}
      <AnimatePresence>
        {activeDetail && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-md"
            onClick={() => setActiveDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl relative border overflow-hidden ${
                activeDetail.type === "sister" 
                  ? activeDetail.title.includes("Backdesk")
                    ? "bg-[#112e36] border-[#235864]/40 text-white"
                    : "bg-gradient-to-br from-[#0a42d9] to-[#041f7a] border-[#1e50ff]/35 text-white"
                  : activeDetail.type === "credential"
                    ? "bg-charcoal border-white/10 text-white"
                    : "bg-white border-charcoal/5 text-charcoal"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background graphic accents for sisters/credentials */}
              {activeDetail.type === "sister" && !activeDetail.title.includes("Backdesk") && (
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M -50,350 L 150,-50 L 190,-50 L -10,350 Z" fill="currentColor" />
                    <path d="M 50,350 L 250,-50 L 290,-50 L 90,350 Z" fill="currentColor" />
                  </svg>
                </div>
              )}
              {activeDetail.type === "sister" && activeDetail.title.includes("Backdesk") && (
                <div className="absolute inset-0 bg-radial-at-t from-[#205763]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              )}

              {/* Close button */}
              <button 
                onClick={() => setActiveDetail(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  activeDetail.type === "pillar" 
                    ? "bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/60" 
                    : "bg-white/10 hover:bg-white/20 text-white/80"
                }`}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header icon or logo */}
              <div className="mb-6 flex justify-start items-center">
                {activeDetail.type === "pillar" && activeDetail.icon && (() => {
                  const Icon = activeDetail.icon;
                  return (
                    <div className="w-12 h-12 rounded-xl bg-ivory flex items-center justify-center border border-charcoal/5">
                      <Icon className="w-6 h-6 text-emerald" />
                    </div>
                  );
                })()}
                
                {activeDetail.type === "sister" && (
                  <div className="h-14 flex items-center">
                    {activeDetail.title.includes("Backdesk") ? (
                      <BackDeskLogo className="h-12" />
                    ) : activeDetail.title.includes("Career") ? (
                      <CareerLogo className="h-12" />
                    ) : activeDetail.logoSrc ? (
                      <img 
                        src={activeDetail.logoSrc} 
                        alt={activeDetail.title} 
                        className="max-h-full object-contain rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-white font-sans font-bold text-lg leading-tight uppercase tracking-wider">
                        {activeDetail.fallbackText}
                      </div>
                    )}
                  </div>
                )}

                {activeDetail.type === "credential" && (
                  <div className="w-10 h-10 rounded-full bg-emerald/20 border border-emerald/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gold-soft" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className={`font-heading font-extrabold text-xl tracking-tight leading-snug ${
                  activeDetail.type === "pillar" ? "text-charcoal" : "text-white"
                }`}>
                  {activeDetail.title}
                </h3>
                
                <p className={`font-sans text-sm leading-relaxed ${
                  activeDetail.type === "pillar" ? "text-soft-text" : "text-white/80"
                }`}>
                  {activeDetail.desc}
                </p>

                {activeDetail.type === "sister" && (
                  <div className="pt-2">
                    <a 
                      href={activeDetail.title.includes("Backdesk") ? "https://backdesk.net" : "https://careerdevelopers.co.bd"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                        activeDetail.title.includes("Backdesk")
                          ? "text-[#7fd1df] hover:text-white hover:underline decoration-2 underline-offset-4"
                          : "text-blue-200 hover:text-white hover:underline decoration-2 underline-offset-4"
                      }`}
                    >
                      <span>Visit Website</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Footer Branding */}
              <div className={`mt-8 pt-4 border-t text-[10px] font-mono uppercase tracking-widest ${
                activeDetail.type === "pillar" ? "border-charcoal/5 text-charcoal/40" : "border-white/10 text-white/30"
              }`}>
                Nexstate Corporation
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
