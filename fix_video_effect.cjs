const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const effectCode = \`  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay prevented"));
    }
  }, []);\`;

if (code.includes(effectCode)) {
    code = code.replace(effectCode, '');
    fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
    console.log('Removed useEffect for video play.');
} else {
    console.log('Could not find useEffect code.');
}
