import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Server, Cpu, CloudCog, Shield, Users, Activity, Layers, Database, ArrowRight } from "lucide-react";
import Tech3DCanvas from "../components/layout/Tech3DCanvas";
import Portals3DCanvas from "../components/layout/Portals3DCanvas";

import AISystems3DCanvas from '../components/layout/AISystems3DCanvas';
import DigitalInfrastructureCanvas from '../components/layout/DigitalInfrastructureCanvas';
import { Network } from 'lucide-react';
import TechnologyCursor from "../components/layout/TechnologyCursor";

export default function TechnologySolutions() {
  const float = {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as any }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 1, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as any }
  };

  return (
    <div className="bg-[#020202] min-h-screen font-sans text-white pt-24 pb-32 selection:bg-emerald-bright/30 relative overflow-hidden">
      <TechnologyCursor />
      
      {/* 3D Canvas Background */}
      <Tech3DCanvas />

      {/* Animated Matrix Background Canvas Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[#020202]/50 backdrop-blur-[2px]"></div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
         <motion.div 
           animate={{ top: ['-10%', '110%'] }} 
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute left-0 right-0 h-[1px] bg-emerald-bright/30"
         />
      </div>

      <div className="mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Futuristic Hero Section */}
        <div className="flex flex-col items-center text-center pt-10 pb-4 relative pointer-events-none w-full max-w-5xl z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald/30 bg-emerald/10 text-emerald-bright text-xs font-mono mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-bright opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-bright"></span>
            </span>
            INTERACTIVE_3D_NETWORK
          </motion.div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tighter mb-8 drop-shadow-2xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="block text-white">Public Service</motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="block font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-bright to-emerald-600">Ecosystems.</motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl font-light leading-relaxed"
          >
            Explore our comprehensive suite of integrated governance platforms. Drag to rotate and hover to inspect individual nodes in the constellation.
          </motion.p>
        </div>

        {/* Detailed Info Sections replacing grid for more textual space */}
        <div className="flex flex-col gap-12 max-w-7xl mx-auto w-full relative z-20 mt-20">
          
          {/* Section 1: Public Services Software */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="group bg-[#050505]/60 backdrop-blur-3xl border border-white/5 hover:border-emerald/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden transition-all duration-700 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="md:w-1/2 flex flex-col justify-center relative z-10">
               <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald/10 group-hover:border-emerald/30 transition-colors duration-500">
                   <Layers className="w-6 h-6 text-white group-hover:text-emerald-bright transition-colors" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-light text-white/90">Integrated Portals</h2>
               </div>
               <p className="text-white/60 mb-6 font-light text-base md:text-lg leading-relaxed">
                 We engineer massive-scale civic tech portals that form the backbone of national and regional governance. Providing seamless experiences to millions requires flawless architecture and resilient backend services.
               </p>
               
               <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-white/50 font-light text-sm">
                 {[
                   "Citizen Complaint Portals",
                   "Utility Bill Systems",
                   "Permit Management",
                   "Land Record Keeping Application",
                   "Tax Management System",
                   "Case Management App",
                   "Judicial Digital Files",
                   "Learning Management System",
                   "Public Health App",
                   "Service Hotlines",
                 ].map((sys, idx) => (
                   <div key={idx} className="flex items-start gap-2">
                     <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-bright shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                     <span>{sys}</span>
                   </div>
                 ))}
               </div>
               
               <p className="text-emerald-bright/70 mt-6 font-mono text-xs tracking-wider">
                 INTERACT WITH CONSTELLATION FOR FULL LIST
               </p>
            </div>
            
            {/* 3D Constellation Card */}
            <div className="md:w-1/2 flex flex-col justify-center h-[50vh] md:h-auto min-h-[400px] relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-white/10 group-hover:border-emerald/20 rounded-3xl z-10 overflow-hidden transition-colors duration-500 shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent z-0 pointer-events-none"></div>
                 {/* 3D Canvas goes here, filling the box */}
                 <div className="absolute inset-0 z-20">
                    <Portals3DCanvas />
                 </div>
                 
                 <div className="absolute top-4 left-6 flex items-center gap-3 z-30 pointer-events-none">
                    <Users className="w-4 h-4 text-emerald-bright drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="font-mono text-[10px] text-white/80 tracking-widest">SYSTEM_TOPOLOGY</span>
                 </div>
                 <div className="absolute top-4 right-6 z-30 pointer-events-none">
                    <motion.div animate={pulse} className="text-emerald-bright font-mono text-[10px] bg-emerald/10 px-2 py-1 rounded">LIVE_SYNC</motion.div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: AI Systems */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="group bg-[#050505]/60 backdrop-blur-3xl border border-white/5 hover:border-emerald/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row-reverse gap-12 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="md:w-1/2 flex flex-col justify-center relative z-10">
               <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors duration-500">
                   <Cpu className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-light">AI Systems Integration</h2>
               </div>
               <p className="text-white/60 mb-6 font-light text-base md:text-lg leading-relaxed">
                 Deploying applied machine learning to remove operational bottlenecks. Organizations must pivot from manual labor to intelligent text processing, dynamic risk classification, and advanced cognitive search.
               </p>
               <ul className="space-y-4 text-white/50 font-light">
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                   <div>
                     <strong className="text-white">Intelligent Data Extraction:</strong> OCR capabilities processing millions of historical physical records instantly.
                   </div>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                   <div>
                     <strong className="text-white">Semantic Search:</strong> Vector-based understanding of institutional data for instant retrieval.
                   </div>
                 </li>
               </ul>
            </div>
            
            <div className="md:w-1/2 flex justify-center items-center h-[50vh] md:h-auto min-h-[400px] relative border border-white/10 group-hover:border-cyan-500/20 bg-black/40 backdrop-blur-md rounded-[2rem] z-10 overflow-hidden transition-colors duration-500 shadow-inner w-full">
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-transparent z-0 pointer-events-none"></div>
               
               <div className="absolute inset-0 z-20">
                  <AISystems3DCanvas />
               </div>

               {/* Overlay Elements */}
               <div className="absolute top-4 left-6 flex items-center gap-3 z-30 pointer-events-none">
                  <Network className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span className="font-mono text-[10px] text-white/80 tracking-widest">NEURAL_NET_ACTIVE</span>
               </div>
               
               <div className="absolute bottom-4 left-6 z-30 pointer-events-none">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: "0 0 8px #22d3ee" }} />
                   <span className="font-mono text-[10px] text-cyan-400/80">PROCESSING</span>
                 </div>
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Box 3: Infrastructure */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="group bg-[#050505]/60 backdrop-blur-3xl border border-white/5 hover:border-emerald/30 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-700 min-h-[450px]"
            >
              <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" referrerPolicy="no-referrer" className="absolute inset-0  opacity-30 mix-blend-screen group-hover:scale-110 transition-transform duration-[2s] ease-out object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
              
              <div className="relative z-10 mb-auto">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                     <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald/10 group-hover:border-emerald/30 transition-colors duration-500">
                       <Shield className="w-6 h-6 text-white group-hover:text-emerald-bright transition-colors" />
                     </div>
                     <h2 className="text-3xl font-light">Digital Infrastructure</h2>
                   </div>
                </div>
                <p className="text-white/50 mb-8 font-light text-base leading-relaxed">
                  Transforming traditional spaces into hyper-connected smart ecosystems. From digital classrooms to smart offices and connected healthcare, we bridge the gap between physical and digital.
                </p>
              </div>
              
              <div className="relative z-10 mt-8 h-80 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                <DigitalInfrastructureCanvas />
              </div>
            </motion.div>

            {/* Box 4: Analytics Dashboard */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.5 }}
              className="group bg-[#050505]/60 backdrop-blur-3xl border border-white/5 hover:border-emerald/30 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-700 min-h-[450px]"
            >
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" referrerPolicy="no-referrer" className="absolute inset-0  opacity-30 mix-blend-screen group-hover:scale-110 transition-transform duration-[2s] ease-out object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>

              <div className="relative z-10 mb-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-emerald/10 group-hover:border-emerald/30 transition-colors duration-500">
                    <Database className="w-6 h-6 text-white group-hover:text-emerald-bright transition-colors" />
                  </div>
                  <h2 className="text-3xl font-light text-white/90">Real-Time Dashboards</h2>
                </div>
                <p className="text-white/50 mb-8 font-light text-base leading-relaxed">
                  Transform scattered digital records into sharp, actionable insights seamlessly. Massive concurrent database queries visualised for instant decision making.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-3 text-emerald-bright font-mono text-sm hover:text-white transition-colors">
                  INITIATE SYSTEMS <Activity className="w-4 h-4 ml-2" /> <ArrowRight className="w-4 h-4 -ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Dynamic Animated Chart Mock */}
              <div className="w-full h-40 bg-black/40 backdrop-blur-md border border-white/10 group-hover:border-emerald/20 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden z-10 mt-8 transition-colors duration-500">
                 <div className="absolute top-4 left-6 flex items-center gap-2 font-mono text-[10px] text-white/50">
                   <Activity className="w-3 h-3 text-emerald-bright" /> STREAM_THROUGHPUT_MBPS
                 </div>
                 
                 <div className="flex items-end justify-between gap-3 h-full w-full pt-8">
                   {[0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.7, 1].map((h, i) => (
                     <motion.div 
                       key={i}
                       className="w-full bg-gradient-to-t from-emerald/10 to-emerald-bright rounded-t-md shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                       style={{ height: `${h * 100}%` }}
                       animate={{ height: [`${h * 100}%`, `${(h * 60)}%`, `${h * 100}%`] }}
                       transition={{ 
                         duration: 2.5, 
                         delay: i * 0.15, 
                         repeat: Infinity,
                         repeatType: "reverse",
                         ease: "easeInOut"
                       }}
                     />
                   ))}
                 </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

