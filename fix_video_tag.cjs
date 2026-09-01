const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const oldVideo = \`<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/hero_video.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        />\`;

const newVideo = \`<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>\`;

if (code.includes(oldVideo)) {
    code = code.replace(oldVideo, newVideo);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video tag updated.');
} else {
    console.log('Video tag not found. Checking if already updated.');
}
