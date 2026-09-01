const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetTag = `<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            NEXSTATE CORPORATION
          </div>`;

if (code.includes(targetTag)) {
    code = code.replace(targetTag, '');
    console.log('Tag removed.');
} else {
    console.log('Tag not found.');
}

const targetSection = `<section className="relative h-screen w-full overflow-hidden flex items-center justify-center">`;
const replacementSection = `<section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">`;

if (code.includes(targetSection)) {
    code = code.replace(targetSection, replacementSection);
    console.log('Section height updated.');
} else {
    console.log('Section not found.');
}

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
