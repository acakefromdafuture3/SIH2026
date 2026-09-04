const fs = require('fs');
const path = require('path');
const lucide = require('./node_modules/lucide-react');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/);
  if (importMatch) {
    const icons = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const icon of icons) {
      if (!lucide[icon]) {
        console.error('MISSING ICON IN ' + filePath + ':', icon);
      }
    }
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.jsx') || full.endsWith('.js')) checkFile(full);
  }
}

walk('src');
console.log('Icon check complete.');
