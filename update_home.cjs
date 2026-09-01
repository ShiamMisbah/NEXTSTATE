const fs = require('fs');

let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace Home component
const oldHome = `export default function Home() {
  return (
    <div className="bg-[#020202] min-h-screen font-sans selection:bg-emerald-500/30">
      <CustomCursor />
      <Hero />
      <Industries />
      <Services />
      <CTA />
    </div>
  );
}`;

const newHome = `export default function Home() {
  return (
    <div className="bg-[#020202] min-h-screen font-sans selection:bg-emerald-500/30">
      <CustomCursor />
      <Hero />
      <Services />
      <Industries />
      <CTA />
    </div>
  );
}`;

code = code.replace(oldHome, newHome);

// Replace Services component
const oldServicesStart = `function Services() {`;
const oldServicesEnd = `    </section>
  );
}`;

const servicesRegex = /function Services\(\) \{[\s\S]*?<\/section>\s*\);\s*\}/;

const newServices = `function Services() {
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
                className={\`group relative flex flex-col bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 p-6 md:p-8 hover:bg-[#0f0f0f] \${isWide ? 'md:col-span-2' : 'md:col-span-1'}\`}
              >
                {/* Background Layer */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img src={service.image} alt={service.title} referrerPolicy="no-referrer" className="w-full h-full object-cover mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className={\`absolute inset-0 bg-gradient-to-t \${isWide ? 'md:bg-gradient-to-r' : ''} from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent\`} />
                </div>
                
                <div className="relative z-10 flex items-start justify-between mb-auto">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors duration-500 backdrop-blur-md">
                    <service.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-mono text-2xl text-white/10 group-hover:text-emerald-500/20 transition-colors font-bold">{service.num}</span>
                </div>
                
                <div className={\`relative z-10 flex flex-col \${isWide ? 'md:max-w-md' : ''}\`}>
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
}`;

if (servicesRegex.test(code)) {
    code = code.replace(servicesRegex, newServices);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Successfully updated Home and Services.');
} else {
    console.log('Could not find Services function in Home.tsx');
}
