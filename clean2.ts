import fs from 'fs';

const content = fs.readFileSync('src/pages/Home.tsx', 'utf8');
const lines = content.split('\n');

const startIdx = lines.findIndex(line => line.startsWith('const dhakaViews = ['));
const endIdx = lines.findIndex((line, i) => i > startIdx && line === '];');

if (startIdx !== -1 && endIdx !== -1) {
    const newLines = [...lines.slice(0, startIdx), ...lines.slice(endIdx + 1)];
    fs.writeFileSync('src/pages/Home.tsx', newLines.join('\n'));
    console.log('Removed dhakaViews');
} else {
    console.log('Could not find component');
}
