// AboKlar build: concatena src/*.js -> app.js e atualiza cache-bust no index.html
const fs = require('fs');
const path = require('path');

let build = parseInt(fs.readFileSync('build-number.txt', 'utf8').trim(), 10) + 1;
fs.writeFileSync('build-number.txt', String(build));

const srcDir = path.join(__dirname, 'src');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js')).sort();
let out = `// AboKlar — build ${build} — ${new Date().toISOString()}\n`;
for (const f of files) {
  out += `\n// ===== ${f} =====\n` + fs.readFileSync(path.join(srcDir, f), 'utf8') + '\n';
}
fs.writeFileSync('app.js', out);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app\.js\?v=\d+/g, `app.js?v=${build}`);
html = html.replace(/data-build="\d+"/g, `data-build="${build}"`);
fs.writeFileSync('index.html', html);

console.log(`Build ${build} ok — ${files.length} ficheiros src`);
