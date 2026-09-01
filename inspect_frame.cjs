const { Jimp } = require('jimp');

async function main() {
  try {
    const image = await Jimp.read('frame.jpg');
    console.log('Width:', image.bitmap.width);
    console.log('Height:', image.bitmap.height);
  } catch (err) {
    console.error('Error reading frame.jpg:', err);
  }
}
main();
