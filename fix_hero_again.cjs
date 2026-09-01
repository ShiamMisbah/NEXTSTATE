const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetSectionStart = `<section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">`;
const replacementSectionStart = `<section className="relative min-h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center">`;

if (code.includes(targetSectionStart)) {
    code = code.replace(targetSectionStart, replacementSectionStart);
}

const targetVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.0] md:scale-[3.2]"
          style={{ objectPosition: 'center' }}
        >`;

const replacementVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >`;

if (code.includes(targetVideo)) {
    code = code.replace(targetVideo, replacementVideo);
} else {
    // maybe it has the scaling
}

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Done');
