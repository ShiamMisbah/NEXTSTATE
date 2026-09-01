const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `<video 
          key="hero-video-final"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Prioritize the custom user-uploaded hero video */}
          <source src="/hero_video.mp4?v=final2" type="video/mp4" />
          {/* Drone/Aero shot of Bangladesh modern development (beautiful 4K cinematic view) */}
          <source src="https://upload.wikimedia.org/wikipedia/commons/8/87/Cinematic_BANGLADESH_in_4K_-_DJI_Mini_2_-_Part_1.webm" type="video/webm" />
          {/* Metro rail arriving in Agargaon station */}
          <source src="https://upload.wikimedia.org/wikipedia/commons/4/42/Metro_train_arriving_in_agargaon_station.webm" type="video/webm" />
        </video>`;

const replacement = `<video 
          key="hero-video"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>`;

code = code.replace(target, replacement);

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
