const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.35] md:scale-150 transform-gpu origin-center"
        >`;

const replacementVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[3.5] md:scale-[4] transform-gpu origin-center"
        >`;

if (code.includes(targetVideo)) {
    code = code.replace(targetVideo, replacementVideo);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video scaled up massively to remove bars.');
} else {
    console.log('Target not found.');
}
