const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const oldBackground = `                {/* Background Layer */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img src={service.image} alt={service.title} referrerPolicy="no-referrer" className="w-full h-full object-cover mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className={\`absolute inset-0 bg-gradient-to-t \${isWide ? 'md:bg-gradient-to-r' : ''} from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent\`} />
                </div>`;

const newBackground = `                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                </div>`;

if (code.includes(oldBackground)) {
    code = code.replace(oldBackground, newBackground);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Images removed from Core Capabilities layout.');
} else {
    console.log('Target block not found.');
}
