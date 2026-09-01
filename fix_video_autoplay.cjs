const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetVideoBlock = `<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>`;

const replacementVideoBlock = `<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          defaultMuted
          playsInline 
          src="/hero_video.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        />`;

if (code.includes(targetVideoBlock)) {
    code = code.replace(targetVideoBlock, replacementVideoBlock);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video autoplay fixed.');
} else {
    console.log('Target video block not found, trying fallback...');
}
