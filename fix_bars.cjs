const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >`;

const replacementVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.35] md:scale-150 transform-gpu origin-center"
        >`;

if (code.includes(targetVideo)) {
    code = code.replace(targetVideo, replacementVideo);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video scale applied to crop black bars.');
} else {
    console.log('Target not found.');
}
