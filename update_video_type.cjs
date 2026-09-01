const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(/<video[\s\S]*?src="\/hero_video\.mp4"[\s\S]*?\/>/, `<video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center opacity-70"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>`);

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
console.log("Updated Home.tsx to include type tag");
