import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowDown, Server, Globe, Zap, Building, Landmark, Route, HardHat, ShieldCheck, UtilityPole, Anchor, Users, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import CustomCursor from "../components/layout/CustomCursor";

const services = [
  { 
    title: "Digital Transformation & ERP", 
    desc: "End-to-end modernization of legacy systems. We build scalable digital backbones that unify data, automate compliance, and streamline national-scale operations.", 
    link: "/technology",
    num: "01",
    icon: Server,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "GovTech & Citizen Portals", 
    desc: "Designing secure, citizen-centric interfaces for public services, ensuring transparent governance, high accessibility, and seamless civic engagement.", 
    link: "/technology",
    num: "02",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    title: "Market Entry & Intelligence", 
    desc: "Strategic advisory for complex markets. We provide regulatory foresight, localization strategies, and actionable intelligence for foreign direct investments.", 
    link: "/advisory",
    num: "03",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  { 
    title: "Critical Infrastructure Tech", 
    desc: "Deploying resilient digital architectures, IoT monitoring, and AI-driven analytics for mega-projects, logistics hubs, and national infrastructure.", 
    link: "/technology",
    num: "04",
    icon: UtilityPole,
    image: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=2071&auto=format&fit=crop"
  }
];

const industries = [
  { 
    title: "Government & Public Sector", 
    desc: "Empowering state administration through e-governance solutions, digital IDs, and large-scale public portals.", 
    link: "/technology",
    num: "01",
    icon: Landmark,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Bangladesh_Secretariat_gate.jpg/1280px-Bangladesh_Secretariat_gate.jpg"
  },
  { 
    title: "Corporate & Enterprise", 
    desc: "Driving operational excellence for private organizations via custom ERP systems, analytics, and workflow automation.", 
    link: "/technology",
    num: "02",
    icon: Building,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Drone_view_from_Kamal_Atat%C3%BCrk_Avenue.jpg/1280px-Drone_view_from_Kamal_Atat%C3%BCrk_Avenue.jpg"
  },
  { 
    title: "Mega Projects & Engineering", 
    desc: "Providing intelligence, advisory, and tech implementation for transformational national infrastructure projects.", 
    link: "/advisory",
    num: "03",
    icon: HardHat,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/The_padma_bridge_02.jpg/1280px-The_padma_bridge_02.jpg"
  },
  { 
    title: "Foreign Direct Investment", 
    desc: "Facilitating international organizations with on-ground execution, market intelligence, and post-entry setup.", 
    link: "/advisory",
    num: "04",
    icon: Globe,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Straddle_carrier_from_Port_of_Chittagong_%2801%29.jpg/1280px-Straddle_carrier_from_Port_of_Chittagong_%2801%29.jpg"
  }
];


// [LOCKED] The hero section layout and styling are locked as per user request. Do not change.
function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-[90vh] md:h-screen w-full flex items-center justify-center bg-[#020202] overflow-hidden">
      {/* Video Background */}
      <motion.div className="absolute inset-0 z-0 w-full h-full">
        <video key="hero-video-final" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.5] md:scale-[2.5] lg:scale-[3] transform-gpu origin-center opacity-60"
        >
          <source src="/hero_video.mp4?v=final" type="video/mp4" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/8/87/Cinematic_BANGLADESH_in_4K_-_DJI_Mini_2_-_Part_1.webm" type="video/webm" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/4/42/Metro_train_arriving_in_agargaon_station.webm" type="video/webm" />
        </video>
        
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020202]/90 via-[#020202]/50 to-emerald-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
      </motion.div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 z-[5] opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-full h-full bg-emerald-500/10 mix-blend-overlay" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 w-full px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="overflow-hidden mb-6 flex flex-col items-center"
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
          From intelligent systems to digital infrastructure, driving technology for national progress.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer z-10"
      >
         <span className="text-white/50 text-xs font-mono uppercase tracking-widest drop-shadow-md">Explore</span>
         <ArrowDown className="w-5 h-5 text-emerald-400 drop-shadow-md" />
      </motion.div>
    </section>
  );
}
function Services() {
  return (
    <section className="py-16 md:py-24 relative z-10 bg-[#020202]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8"
        >
           <div className="max-w-3xl">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Core Capabilities.</h2>
             <p className="text-white/60 text-base md:text-lg font-medium max-w-2xl">
               Delivering systemic digital solutions and strategic advisories designed to drive operational excellence at a national scale.
             </p>
           </div>
           <Link to="/technology" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-emerald-400 transition-colors">
             View All Solutions <ArrowRight className="w-4 h-4" />
           </Link>        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
          {services.map((service, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={`group relative flex flex-col bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 p-6 md:p-8 hover:bg-[#0f0f0f] ${isWide ? 'md:col-span-2' : 'md:col-span-1'}`}
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                </div>
                
                <div className="relative z-10 flex items-start justify-between mb-auto">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors duration-500 backdrop-blur-md">
                    <service.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-mono text-2xl text-white/10 group-hover:text-emerald-500/20 transition-colors font-bold">{service.num}</span>
                </div>
                
                <div className={`relative z-10 flex flex-col ${isWide ? 'md:max-w-md' : ''}`}>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-emerald-400 transition-colors duration-300">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-widest group-hover:text-emerald-300 transition-colors">
                    <span>Explore</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                <Link to={service.link} className="absolute inset-0 z-20" aria-label={service.title} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="py-16 md:py-24 w-full px-6 relative z-10 bg-[#020202]">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-16 md:pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16 text-center flex flex-col items-center"
        >
           <h2 className="text-4xl md:text-5xl font-light text-white mb-4">National Development Sectors</h2>
           <p className="text-white/50 font-mono tracking-widest uppercase text-sm">Government & Infrastructure Projects</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((industry, index) => {
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative h-[380px] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-700 hover:border-emerald-500/30 cursor-pointer"
              >
                 <div className="absolute inset-0 z-0">
                    <img 
                      src={industry.image} 
                      alt={industry.title} 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-70" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
                 </div>
                 
                 <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                    <industry.icon className="w-8 h-8 text-white/50 group-hover:text-emerald-400 mb-4 transition-colors duration-500" />
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-emerald-400 transition-colors duration-500">
                      {industry.title}
                    </h3>
                    <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-2">
                      <p className="text-white/70 text-sm mb-4 leading-relaxed">
                        {industry.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                         View Sector <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                 </div>
                 <Link to={industry.link} className="absolute inset-0 z-20" aria-label={industry.title} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-24 px-6 bg-[#050505] flex flex-col items-center justify-center overflow-hidden text-center border-t border-white/5">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8">
          Ready to Build <br /> <span className="font-medium text-emerald-400">The Future?</span>
        </h2>
        <Link to="/contact" className="group relative inline-flex items-center justify-center px-10 py-5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500 rounded-full transition-all duration-300 font-mono tracking-widest uppercase overflow-hidden shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.5)]">
          <span className="relative z-10 flex items-center gap-3">Initiate Contact <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
        </Link>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-[#020202] min-h-screen font-sans selection:bg-emerald-500/30">
      <CustomCursor />
      <Hero />
      <Services />
      <Industries />
      <CTA />
    </div>
  );
}

