// Builds the standalone GitHub Pages page. The Artifact build relies on a host
// skeleton (doctype/head/reset); this one ships the whole document itself.
const fs = require('fs');

const t = fs.readFileSync('template.html', 'utf8');
const data = fs.readFileSync('data.json', 'utf8');

const i = t.indexOf('</style>') + '</style>'.length;
const head = t.slice(0, i);
const body = t.slice(i).replace('__DATA__', data);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A world map scoring 186 states on resilience to AI's four most likely physical threats: infrastructure attack, engineered pathogen, autonomous weapons, and nuclear exchange.">
<meta name="color-scheme" content="light dark">
${head}
<style>img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${body.trim()}
</body>
</html>
`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('dist/index.html', (fs.statSync('dist/index.html').size / 1024).toFixed(0) + 'KB');
