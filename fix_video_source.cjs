const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regex = /<video([\s\S]*?)src="\/hero_video\.mp4"([\s\S]*?)\/>/m;

code = code.replace(regex, '<video$1$2>\n          <source src="/hero_video.mp4" type="video/mp4" />\n        </video>');
fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Video source updated.');
