import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AdvisoryCursor from "../components/layout/AdvisoryCursor";

const advisoryData = [
  {
    title: "Policy Advisory & Advocacy",
    desc: "We support clients in navigating and shaping the policy landscape through evidence-based advisory and stakeholder engagement. This includes identifying regulatory bottlenecks and aligning business strategies with national priorities.",
    color: "#059669",
    image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=2070&auto=format&fit=crop",
    video: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Illuminated_supreme_Court.webm"
  },
  {
    title: "Market Intelligence & Advisory",
    desc: "We provide integrated support from opportunity identification to market execution. Our work combines in-depth sector and market analysis with feasibility assessments to evaluate commercial, financial, and operational viability.",
    color: "#2563eb",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    video: "https://upload.wikimedia.org/wikipedia/commons/d/df/Street_market%2C_Jurain%2C_Dhaka.webm"
  },
  {
    title: "On-Ground Execution & Localization",
    desc: "We provide on-ground execution support for market navigation, stakeholder engagement, and operational setup. We support businesses to adapt to local conditions, with facilitation of partnerships, transactions, and company incorporation.",
    color: "#d97706",
    image: "https://images.unsplash.com/photo-1541888087401-d5fadfaf8384?q=80&w=2070&auto=format&fit=crop",
    video: "https://upload.wikimedia.org/wikipedia/commons/8/85/Launches_of_Sadarghat_-_A_view_from_the_river.webm"
  },
  {
    title: "Post-Entry Operations",
    desc: "We offer support for talent acquisition, financial and legal compliance, and operational efficiency to ensure smooth business continuity. Our ongoing strategic guidance enables scaling, market adaptation, and performance optimization.",
    color: "#7c3aed",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
    video: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Benapole_Express_%28795%29_crossing_Garai_Rail_Bridge.webm"
  }
];

function TransitionOne({ refObj, scrollYProgress, data, index, isMobile }: any) {
  const videoWidth = useTransform(scrollYProgress, [0, 0.25], ["100vw", "50vw"]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (latest > 0.1) setHasEntered(true);
    else if (latest <= 0.05) setHasEntered(false);
  });

  const variants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" as any } }
  };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section ref={refObj} className="h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full bg-[#050505] overflow-hidden flex">
        <motion.div className="absolute left-0 top-0 h-full overflow-hidden origin-left" style={{ width: isMobile ? "100%" : videoWidth }}>
          {data.video ? (
            <video autoPlay loop muted playsInline className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-full object-cover max-w-none">
              <source src={data.video} type="video/webm" />
            </video>
          ) : (
            <img src={data.image} alt={data.title} referrerPolicy="no-referrer" className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6" style={{ opacity: isMobile ? 0 : initialTextOpacity }}>
            <span className="font-mono text-base md:text-lg tracking-[0.3em] uppercase font-bold text-white/50 mb-4">0{index + 1}</span>
            <h2 className="text-white font-bold text-4xl md:text-6xl drop-shadow-2xl">{data.title}</h2>
          </motion.div>
        </motion.div>

        <motion.div className={`absolute ${isMobile ? 'left-0 bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-20 flex flex-col justify-end pb-16' : 'right-0 top-0 h-full w-[50vw] bg-[#111]/95 backdrop-blur-xl flex flex-col justify-center'} px-8 md:px-16 lg:px-24 pointer-events-none text-left`}>
          <motion.div className="pointer-events-auto" initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={variants}>
            <motion.div variants={item} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px]" style={{ backgroundColor: data.color }}></span>
              <span className="font-mono text-base md:text-lg tracking-[0.2em] uppercase font-bold text-white/50">0{index + 1}</span>
            </motion.div>
            <motion.h3 variants={item} className="text-white font-bold text-3xl md:text-5xl mb-4 leading-tight">{data.title}</motion.h3>
            <motion.p variants={item} className="text-white/70 text-base md:text-lg font-medium mb-8 leading-relaxed">{data.desc}</motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TransitionTwo({ refObj, scrollYProgress, data, index, isMobile }: any) {
  const videoWidth = useTransform(scrollYProgress, [0, 0.25], ["100vw", "50vw"]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (latest > 0.1) setHasEntered(true);
    else if (latest <= 0.05) setHasEntered(false);
  });

  const variants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" as any } }
  };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section ref={refObj} className="h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full bg-[#020202] overflow-hidden flex">
        <motion.div className="absolute right-0 top-0 h-full overflow-hidden origin-right" style={{ width: isMobile ? "100%" : videoWidth }}>
          {data.video ? (
            <video autoPlay loop muted playsInline className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-full object-cover max-w-none">
              <source src={data.video} type="video/webm" />
            </video>
          ) : (
            <img src={data.image} alt={data.title} referrerPolicy="no-referrer" className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6" style={{ opacity: isMobile ? 0 : initialTextOpacity }}>
            <span className="font-mono text-base md:text-lg tracking-[0.3em] uppercase font-bold text-white/50 mb-4">0{index + 1}</span>
            <h2 className="text-white font-bold text-4xl md:text-6xl drop-shadow-2xl">{data.title}</h2>
          </motion.div>
        </motion.div>

        <motion.div className={`absolute ${isMobile ? 'left-0 bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#020202] via-[#020202]/95 to-transparent z-20 flex flex-col justify-end pb-16' : 'left-0 top-0 h-full w-[50vw] bg-[#0a0a0a] flex flex-col justify-center'} px-8 md:px-16 lg:px-24 pointer-events-none text-left`}>
          <motion.div className="pointer-events-auto" initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={variants}>
            <motion.div variants={item} className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px]" style={{ backgroundColor: data.color }}></span>
              <span className="font-mono text-base md:text-lg tracking-[0.2em] uppercase font-bold text-white/50">0{index + 1}</span>
            </motion.div>
            <motion.h3 variants={item} className="text-white font-bold text-3xl md:text-5xl mb-4 leading-tight">{data.title}</motion.h3>
            <motion.p variants={item} className="text-white/70 text-base md:text-lg font-light mb-8 leading-relaxed">{data.desc}</motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TransitionThree({ refObj, scrollYProgress, data, index, isMobile }: any) {
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);
  const blurFilter = useTransform(scrollYProgress, [0, 0.25], ["blur(0px)", "blur(20px)"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25], [0.5, 0.8]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (latest > 0.1) setHasEntered(true);
    else if (latest <= 0.05) setHasEntered(false);
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" as any } }
  };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section ref={refObj} className="h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full bg-[#111] overflow-hidden flex items-center justify-center">
        <motion.div className="absolute inset-0 w-full h-full" style={{ scale: videoScale, filter: blurFilter }}>
           {data.video ? (
             <video autoPlay loop muted playsInline className="w-full h-full object-cover">
               <source src={data.video} type="video/webm" />
             </video>
           ) : (
             <img src={data.image} alt={data.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
           )}
        </motion.div>
        <motion.div className="absolute inset-0 bg-[#0a0a0a] pointer-events-none" style={{ opacity: overlayOpacity }} />

        <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6" style={{ opacity: isMobile ? 0 : initialTextOpacity }}>
          <span className="font-mono text-base md:text-lg tracking-[0.3em] uppercase font-bold text-white/50 mb-4">0{index + 1}</span>
          <h3 className="text-white font-bold text-4xl md:text-6xl drop-shadow-2xl">{data.title}</h3>
        </motion.div>

        <motion.div 
          className="relative z-10 w-[90%] max-w-3xl bg-[#1a1a1a]/90 backdrop-blur-2xl p-6 md:p-16 rounded-3xl shadow-2xl border border-white/10 pointer-events-none flex flex-col items-center text-center"
          initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={variants}
        >
          <div className="pointer-events-auto flex flex-col items-center w-full">
            <motion.div variants={item} className="flex justify-center items-center gap-4 mb-6">
              <span className="w-8 h-[2px]" style={{ backgroundColor: data.color }}></span>
              <span className="font-mono text-base md:text-lg tracking-[0.2em] uppercase font-bold text-white/50">0{index + 1}</span>
              <span className="w-8 h-[2px]" style={{ backgroundColor: data.color }}></span>
            </motion.div>
            <motion.h3 variants={item} className="text-white font-bold text-2xl md:text-5xl mb-4 leading-tight">{data.title}</motion.h3>
            <motion.p variants={item} className="text-white/70 text-sm md:text-lg font-medium mb-2 md:mb-8 leading-relaxed max-w-2xl mx-auto">{data.desc}</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TransitionFour({ refObj, scrollYProgress, data, index, isMobile }: any) {
  const videoHeight = useTransform(scrollYProgress, [0, 0.25], ["100vw", "50vh"]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (latest > 0.1) setHasEntered(true);
    else if (latest <= 0.05) setHasEntered(false);
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" as any } }
  };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section ref={refObj} className="h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full bg-[#050505] overflow-hidden flex flex-col justify-end">
        <motion.div className="absolute top-0 left-0 w-full overflow-hidden bg-black" style={{ height: isMobile ? "50vh" : videoHeight }}>
          {data.video ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              
              onPlay={(e) => { 
                e.currentTarget.playbackRate = 5.0; 
                if (e.currentTarget.currentTime < 10.0) {
                  e.currentTarget.currentTime = 10.0;
                }
              }}
              onLoadedMetadata={(e) => { 
                e.currentTarget.playbackRate = 5.0; 
                e.currentTarget.currentTime = 10.0;
              }}
              onTimeUpdate={(e) => {
                if (e.currentTarget.currentTime < 10.0) {
                  e.currentTarget.currentTime = 10.0;
                }
              }}
              className="w-full h-full object-cover opacity-80" 
            >
              <source src={data.video} type="video/webm" />
            </video>
          ) : (
            <img src={data.image} alt={data.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          )}
           <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6" style={{ opacity: isMobile ? 0 : initialTextOpacity }}>
            <span className="font-mono text-base md:text-lg tracking-[0.3em] uppercase font-bold text-white/50 mb-4">0{index + 1}</span>
            <h3 className="text-white font-bold text-4xl md:text-6xl drop-shadow-2xl">{data.title}</h3>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative w-full h-[50vh] bg-[#111] border-t border-white/5 flex flex-col justify-center px-6 md:px-16 lg:px-24 pointer-events-none"
          initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={variants}
        >
          <div className="pointer-events-auto max-w-4xl mx-auto w-full text-center flex flex-col items-center">
            <motion.div variants={item} className="flex justify-center items-center gap-4 mb-4 md:mb-6">
              <span className="w-12 h-[2px]" style={{ backgroundColor: data.color }}></span>
              <span className="font-mono text-base md:text-lg tracking-[0.2em] uppercase font-bold text-white/50">0{index + 1}</span>
            </motion.div>
            <motion.h3 variants={item} className="text-white font-bold text-2xl md:text-5xl mb-4 leading-tight">{data.title}</motion.h3>
            <motion.p variants={item} className="text-white/70 text-sm md:text-lg font-medium leading-relaxed">{data.desc}</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TransitionFive({ refObj, scrollYProgress, data, index, isMobile }: any) {
  const videoWidth = useTransform(scrollYProgress, [0, 0.25], ["100vw", "40vw"]);
  const videoHeight = useTransform(scrollYProgress, [0, 0.25], ["100vh", "70vh"]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ["0vw", "5vw"]);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ["0vh", "15vh"]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.25], ["0px", "24px"]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const [hasEntered, setHasEntered] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (latest > 0.1) setHasEntered(true);
    else if (latest <= 0.05) setHasEntered(false);
  });

  const variants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" as any } }
  };
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section ref={refObj} className="h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full bg-[#0a0a0a] overflow-hidden flex">
        <motion.div 
          className="absolute overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 origin-top-left" 
          style={{ 
            width: isMobile ? "100%" : videoWidth, 
            height: isMobile ? "100%" : videoHeight, 
            left: isMobile ? "0px" : videoX, 
            top: isMobile ? "0px" : videoY, 
            borderRadius: isMobile ? "0px" : videoRadius 
          }}
        >
          {data.video ? (
            <video autoPlay loop muted playsInline className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-full object-cover max-w-none">
              <source src={data.video} type="video/webm" />
            </video>
          ) : (
            <img src={data.image} alt={data.title} referrerPolicy="no-referrer" className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6" style={{ opacity: isMobile ? 0 : initialTextOpacity }}>
            <span className="font-mono text-base md:text-lg tracking-[0.3em] uppercase font-bold text-white/50 mb-4">0{index + 1}</span>
            <h3 className="text-white font-bold text-4xl md:text-6xl drop-shadow-2xl">{data.title}</h3>
          </motion.div>
        </motion.div>

        <motion.div 
          className={`absolute ${isMobile ? 'left-0 bottom-0 w-full h-[60vh] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-20 flex flex-col justify-end pb-16' : 'right-0 top-0 w-[100vw] md:w-[50vw] h-full flex flex-col justify-center'} px-8 md:px-16 pointer-events-none z-0 text-left`}
          initial="hidden" animate={hasEntered ? "visible" : "hidden"} variants={variants}
        >
          <div className="pointer-events-auto mt-0 md:mt-24">
            <motion.div variants={item} className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="w-12 h-[2px]" style={{ backgroundColor: data.color }}></span>
              <span className="font-mono text-base md:text-lg tracking-[0.2em] uppercase font-bold text-white/50">0{index + 1}</span>
            </motion.div>
            <motion.h3 variants={item} className="text-white font-bold text-2xl md:text-5xl mb-4 leading-tight">{data.title}</motion.h3>
            <motion.p variants={item} className="text-white/70 text-sm md:text-lg font-medium leading-relaxed">{data.desc}</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceSection({ data, index, isMobile }: { data: typeof advisoryData[0], index: number, isMobile: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const props = { refObj: ref, scrollYProgress, data, index, isMobile };
  
  if (index % 5 === 1) return <TransitionTwo {...props} />;
  if (index % 5 === 2) return <TransitionThree {...props} />;
  if (index % 5 === 3) return <TransitionFour {...props} />;
  if (index % 5 === 4) return <TransitionFive {...props} />;
  return <TransitionOne {...props} />;
}

export default function Advisory() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const filterGrayscale = useTransform(scrollYProgress, [0, 0.05], ["grayscale(100%) brightness(1)", "grayscale(0%) brightness(1.2)"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.05], [0.6, 0]);

  return (
    <div className="bg-[#020202] min-h-screen text-white pt-24 font-sans relative">
      <AdvisoryCursor />
      
      {/* Hero Header */}
      <section ref={containerRef} className="relative h-[150vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 bg-cover"
            style={{ 
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Ruppur_Nuclear_Power_Plant_%2C_Ruppur%2C_Pabna.jpg/1280px-Ruppur_Nuclear_Power_Plant_%2C_Ruppur%2C_Pabna.jpg")',
              backgroundPosition: "center bottom",
              filter: filterGrayscale,
              scale: scaleImage,
              transformOrigin: "center bottom"
            }}
          />
          <motion.div className="absolute inset-0 bg-[#020202]" style={{ opacity: overlayOpacity }} />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#020202] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020202] to-transparent" />
          
          <motion.div 
            style={{ opacity: opacityText }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Strategic <span className="text-emerald-500 font-light">Advisory</span>
              </h1>
              <p className="text-xl text-[#ccc] font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                We provide the expertise you need from entry to scaled growth, leveraging high-impact infrastructure and sector-specific strategies.
              </p>
            </div>
            <div className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce">
              <span className="text-white/80 text-sm font-semibold tracking-widest uppercase bg-black/50 border border-white/10 px-4 py-1 rounded-full backdrop-blur-md">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 text-white/80 bg-black/50 border border-white/10 rounded-full p-1 box-content" />
            </div>
          </motion.div>
        </div>
      </section>
 
      {/* Services List */}
      <div className="flex flex-col">
        {advisoryData.map((data, index) => (
          <ServiceSection key={index} data={data} index={index} isMobile={isMobile} />
        ))}
      </div>

      {/* Call to Action Section */}
      <section className="relative py-28 md:py-36 bg-[#020202] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="font-mono text-emerald-500 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4 block">
            Start Your Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Ready to Partner with us?
          </h2>
          <p className="text-[#999] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Whether you are looking to enter the market, navigate complex regulations, or establish a strong post-entry operational presence, our experts are here to help.
          </p>
          <div>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full font-mono text-xs md:text-sm uppercase tracking-widest text-white border transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.15)] group"
              style={{ 
                backgroundColor: "rgba(16, 185, 129, 0.1)", 
                borderColor: "#10b981",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#10b981";
                e.currentTarget.style.boxShadow = "0 0 35px rgba(16, 185, 129, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(16, 185, 129, 0.15)";
              }}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

