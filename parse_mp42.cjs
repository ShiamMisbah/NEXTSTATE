const fs = require('fs');
const buffer = Buffer.alloc(1024);
const fd = fs.openSync('public/hero_video.mp4', 'r');
fs.readSync(fd, buffer, 0, 1024, 0);
console.log(buffer.toString('ascii').replace(/[^a-zA-Z0-9 ]/g, '.'));
