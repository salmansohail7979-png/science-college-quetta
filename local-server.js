// Local development server: serves the API and the website from one place.
//   npm install
//   npm run seed   (optional demo data)
//   npm run dev    -> http://localhost:5000
const path = require('path');
const express = require('express');
const app = require('./server/app'); // also loads .env

const PORT = process.env.PORT || 5000;
const site = express();

site.use(app); // /api/*
site.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
site.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));

site.listen(PORT, () => {
  console.log('');
  console.log('  🎓 Science College Quetta');
  console.log(`  🌐 Website:  http://localhost:${PORT}`);
  console.log(`  🔌 API:      http://localhost:${PORT}/api/health`);
  console.log('  👨‍💻 Developed by Salman Sohail & Zain');
  console.log('');
});
