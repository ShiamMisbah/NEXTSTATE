const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Replace Home export to reorder Industries and Services
homeCode = homeCode.replace(
  '<Services />\n      <Industries />',
  '<Industries />\n      <Services />'
);

let startIdxS = homeCode.indexOf('function Services() {');
let startIdxI = homeCode.indexOf('function Industries() {');

// Because I swapped them in the export default, let me check the file content first. I haven't swapped their declaration order, which is fine, but I need to replace the `function Services() { ... }` block accurately.
let endIdxS = homeCode.indexOf('function Industries() {');
if (endIdxS < startIdxS) {
    // If Industries comes before Services in declaration
    endIdxS = homeCode.indexOf('function CTA() {');
}

let beforeS = homeCode.substring(0, startIdxS);
let afterS = homeCode.substring(endIdxS);

const newServices = `function Services() {
  return (
    <section className="py-24 relative z-10 bg-[#020202]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8"
        >
           <div className="max-w-3xl">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Core Capabilities.</h2>
             <p className="text-white/60 text-base md:text-lg font-medium max-w-2xl">
               Delivering systemic digital solutions and strategic advisories designed to drive operational excellence at a national scale.
             </p>
           </div>
           <Link to="/technology" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-emerald-400 transition-colors">
             View All Solutions <ArrowRight className="w-4 h-4" />
           </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500 h-full p-6 hover:bg-[#0f0f0f]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-colors duration-500">
                    <service.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-mono text-lg text-white/10 group-hover:text-emerald-500/30 transition-colors">{service.num}</span>
                </div>
                
                <div className="flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-widest mt-auto group-hover:text-emerald-300 transition-colors">
                    <span>Explore Solution</span> <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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

fs.writeFileSync('src/pages/Home.tsx', beforeS + newServices + '\n' + afterS, 'utf8');
