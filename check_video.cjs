const fs = require('fs');

const fd = fs.openSync('public/hero_video_drive.mp4', 'r');
const buffer = Buffer.alloc(100);
fs.readSync(fd, buffer, 0, 100, 0);
fs.closeSync(fd);

console.log(buffer.toString('hex'));
