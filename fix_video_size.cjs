const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `<motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >`;

const replacement = `<motion.div 
        className="absolute inset-0 z-0 w-full h-full"
      >
        <video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        >`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video size updated successfully.');
} else {
    console.log('Target not found.');
}
