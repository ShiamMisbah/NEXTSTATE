const MP4Box = require('mp4box');
const fs = require('fs');

const file = fs.readFileSync('public/hero_video_drive.mp4');
const arrayBuffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);

const mp4boxfile = MP4Box.createFile();
mp4boxfile.onReady = function(info) {
  console.log("Width: " + info.videoTracks[0].video.width);
  console.log("Height: " + info.videoTracks[0].video.height);
};
arrayBuffer.fileStart = 0;
mp4boxfile.appendBuffer(arrayBuffer);
mp4boxfile.flush();
