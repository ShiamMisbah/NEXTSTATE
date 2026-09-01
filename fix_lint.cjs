const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  'const y = useTransform(scrollY, [0, 1000], [0, 300]);',
  '// const y = useTransform(scrollY, [0, 1000], [0, 300]);'
);
code = code.replace(
  'const scale = useTransform(scrollY, [0, 500], [1, 1.1]);',
  '// const scale = useTransform(scrollY, [0, 500], [1, 1.1]);'
);

fs.writeFileSync('src/pages/Home.tsx', code, 'utf8');
