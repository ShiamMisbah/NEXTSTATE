const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const heroRegex = /function Hero\(\) \{[\s\S]*?\}\s*(?=\n(?:function|export|const|$))/;

const newHero = `function Hero() {
  const { scrollY } = useScroll();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    
    // Explicitly play it on mount just in case autoPlay is not enough
    video.play().catch(e => console.log('Autoplay prevented:', e));
  }, []);

  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0 w-full h-full">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          src={heroVideo}
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        />
        
        {/* Adjusted overlays to ensure visibility */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020202]/40 via-[#020202]/20 to-emerald-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/50 via-transparent to-transparent" />
      </motion.div>
      
      {/* Animated Particles/Overlay */}
      <div className="absolute inset-0 z-[5] opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-full h-full bg-emerald-500/10 mix-blend-overlay" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 w-full px-6 flex flex-col items-center mt-20">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="overflow-hidden mb-6 text-center flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-lg">
            Powering the Future
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-emerald-400 mt-2 drop-shadow-lg">
            of Bangladesh
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/90 font-light max-w-2xl text-center drop-shadow-md"
        >
          From energy to connectivity, guiding strategic investments in national progress.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 animate-bounce"
        >
           <span className="text-white/50 text-xs font-mono uppercase tracking-widest">Explore</span>
           <ArrowDown className="w-5 h-5 text-emerald-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}`;

code = code.replace(heroRegex, newHero);
fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log("Rewrote Hero component.");
