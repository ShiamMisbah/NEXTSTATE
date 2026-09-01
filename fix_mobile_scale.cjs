const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-[3.5] md:scale-[3.2]"`;

const replacement = `className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.0] md:scale-[3.2]"`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Mobile scale fixed.');
} else {
    console.log('Target not found.');
}
