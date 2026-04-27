const fs = require('fs');
const path = require('path');

const dir = './src/environments';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const content = `
export const environment = {
  production: true,
  geminiApiKey: '${process.env.GEMINI_API_KEY || ''}',
  contactEmail: '${process.env.contactEmail || ''}',
  formspreeUrl: '${process.env.formspreeUrl || ''}'
};
`;

fs.writeFileSync(path.join(dir, 'environment.ts'), content);
fs.writeFileSync(path.join(dir, 'environment.prod.ts'), content);

console.log('Environment files generated successfully!');
