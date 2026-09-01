const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `<video 
          key="hero-video-waiting"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Waiting for user link */}
        </video>`;

const replacement = `<video 
          key="hero-video-permanent"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Permanent user video from Google Drive */}
          <source src="https://drive.google.com/uc?export=download&id=1RfsWqDXyeg6tQNm3CcPwDBawZYDZGoSe" type="video/mp4" />
        </video>`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video updated successfully.');
} else {
    console.log('Target not found.');
}
