const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const regex = /<video[\s\S]*?\/>/m;

const newVideo = \`<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          src="https://cdn.pixabay.com/video/2021/08/11/84774-588448152_large.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        />\`;

code = code.replace(regex, newVideo);
fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log('Video URL changed to pixabay.');
