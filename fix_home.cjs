const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

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
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">Core Capabilities.</h2>
             <p className="text-white/60 text-lg md:text-xl font-medium">
               Delivering systemic digital solutions and strategic advisories designed to drive operational excellence at a national scale.
             </p>
           </div>
           <Link to="/technology" className="hidden md:inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-white/50 hover:text-emerald-400 transition-colors">
             View All Solutions <ArrowRight className="w-5 h-5" />
           </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative overflow-hidden bg-[#0a0a0a] rounded-3xl h-[320px] cursor-pointer border border-white/5 hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
                </div>
                
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors duration-500">
                      <service.icon className="w-5 h-5 text-white group-hover:text-emerald-400 transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-500">{service.title}</h3>
                  </div>
                  
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-40 opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-2">
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">{service.desc}</p>
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest hover:text-emerald-300">
                      <span>Explore Solution</span> <ArrowRight className="w-4 h-4" />
                    </div>
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

const newIndustries = `function Industries() {
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
}`;

let startIdxS = code.indexOf('function Services() {');
let startIdxI = code.indexOf('function Industries() {');
let startIdxC = code.indexOf('function ContactCTA() {');

let beforeS = code.substring(0, startIdxS);
let afterC = code.substring(startIdxC);

let result = beforeS + newServices + '\n\n' + newIndustries + '\n\n' + afterC;

fs.writeFileSync('src/pages/Home.tsx', result, 'utf8');
