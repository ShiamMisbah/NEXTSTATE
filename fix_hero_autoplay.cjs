const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const targetFunction = `function Hero() {
  const { scrollY } = useScroll();`;

const replacementFunction = `function Hero() {
  const { scrollY } = useScroll();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
    }
  }, []);`;

if (code.includes(targetFunction)) {
    code = code.replace(targetFunction, replacementFunction);
    console.log('Added useRef and useEffect to Hero.');
} else {
    console.log('Target function not found.');
}

const targetVideo = `<video 
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[3.5] md:scale-[4] transform-gpu origin-center"
        >`;

const replacementVideo = `<video 
          ref={videoRef}
          key="hero-video-local"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-[1.35] md:scale-[1.5] transform-gpu origin-center"
        >`;

if (code.includes(targetVideo)) {
    code = code.replace(targetVideo, replacementVideo);
    console.log('Added ref to video and adjusted scale.');
} else {
    console.log('Target video not found.');
}

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
