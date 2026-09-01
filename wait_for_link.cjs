const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `<video 
          key="hero-video-final3"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Custom uploaded video */}
          <source src="/hero_video.mp4?v=3" type="video/mp4" />
        </video>`;

const replacement = `<video 
          key="hero-video-waiting"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Waiting for user link */}
        </video>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
