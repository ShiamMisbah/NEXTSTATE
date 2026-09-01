const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetVideoBlock = `<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.35] md:scale-[1.5] transform-gpu origin-center"
        >
          {/* Permanent user video downloaded from Google Drive */}
          <source src="/hero_video_drive.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020202] via-[#020202]/70 to-emerald-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />`;

const replacementVideoBlock = `<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/hero_video_drive.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-125 transform-gpu origin-center"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Adjusted overlays to ensure visibility (removed mix-blend-multiply which can crush blacks) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020202]/90 via-[#020202]/60 to-emerald-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />`;

if (code.includes(targetVideoBlock)) {
    code = code.replace(targetVideoBlock, replacementVideoBlock);
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Video block and overlays updated.');
} else {
    console.log('Target video block not found, trying partial replacement...');
    
    // Fallback if formatting is slightly different
    code = code.replace(/mix-blend-multiply/g, 'opacity-80');
    code = code.replace(/<source src="\/hero_video_drive.mp4" type="video\/mp4" \/>/g, '<source src="/hero_video_drive.mp4" type="video/mp4" /><source src="/hero_video.mp4" type="video/mp4" />');
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Fallback replacements applied.');
}
