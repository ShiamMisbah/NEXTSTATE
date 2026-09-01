const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetOverlays = \`<div className="absolute inset-0 bg-gradient-to-tr from-[#020202]/90 via-[#020202]/60 to-emerald-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />\`;

const newOverlays = \`<div className="absolute inset-0 bg-gradient-to-tr from-[#020202]/40 via-[#020202]/20 to-emerald-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/50 via-transparent to-transparent" />\`;

code = code.replace(targetOverlays, newOverlays);
fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Overlays lightened.');
