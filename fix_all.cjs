const fs = require('fs');

// 1. Fix Advisory.tsx - put the Ruppur image back!
let advisoryCode = fs.readFileSync('src/pages/Advisory.tsx', 'utf8');
advisoryCode = advisoryCode.replace(
  'url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop")',
  'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Ruppur_Nuclear_Power_Plant_%2C_Ruppur%2C_Pabna.jpg/1280px-Ruppur_Nuclear_Power_Plant_%2C_Ruppur%2C_Pabna.jpg")'
);
fs.writeFileSync('src/pages/Advisory.tsx', advisoryCode, 'utf8');

// 2. Fix Home.tsx - remove photos from Core Capabilities completely
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
let startIdxS = homeCode.indexOf('function Services() {');
let startIdxI = homeCode.indexOf('function Industries() {');
let beforeS = homeCode.substring(0, startIdxS);
let afterS = homeCode.substring(startIdxI);

const newServices = `function Services() {
  return (
    <section className="py-24 md:py-32 relative z-10 bg-[#020202]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12"
        >
           <div className="max-w-3xl">
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">Core Capabilities.</h2>
             <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl">
               Delivering systemic digital solutions and strategic advisories designed to drive operational excellence at a national scale.
             </p>
           </div>
           <Link to="/technology" className="hidden md:inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-white/50 hover:text-emerald-400 transition-colors">
             View All Solutions <ArrowRight className="w-5 h-5" />
           </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-700 h-full p-8 md:p-10 hover:bg-[#0f0f0f]"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors duration-500">
                    <service.icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <span className="font-mono text-2xl text-white/10 group-hover:text-emerald-500/30 transition-colors">{service.num}</span>
                </div>
                
                <div className="flex flex-col flex-1">
                  <h3 className="text-3xl font-bold text-white tracking-tight mb-4">{service.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-8 flex-1">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm uppercase tracking-widest mt-auto group-hover:text-emerald-300 transition-colors">
                    <span>Explore Solution</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

`;

fs.writeFileSync('src/pages/Home.tsx', beforeS + newServices + afterS, 'utf8');
