// AboKlar deploy: commit + push (requer GITHUB_TOKEN)
const { execSync } = require('child_process');
const fs = require('fs');

const msg = process.argv[2] || 'update';
const build = fs.readFileSync('build-number.txt', 'utf8').trim();
const token = process.env.GITHUB_TOKEN;
if (!token) { console.error('GITHUB_TOKEN em falta'); process.exit(1); }

const remote = `https://patrsolothurn-glitch:${token}@github.com/patrsolothurn-glitch/aboklar.git`;
execSync('git add -A');
execSync(`git -c user.name="Patricio" -c user.email="patrsolothurn-glitch@users.noreply.github.com" commit -m "AboKlar-${build}: ${msg}"`);
execSync(`git push ${remote} main`);
console.log(`Deploy AboKlar-${build} enviado: ${msg}`);
