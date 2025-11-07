const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const normalizeSlug = (value = '') => {
  const decoded = decodeURIComponent(value).replace(/\.html?$/i, '');
  return decoded
    .normalize('NFD')
    .replace(/[^\p{Letter}\p{Number}\-\s]/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
};

module.exports = function handler(req, res) {
  const { slug = '' } = req.query;

  if (!slug) {
    res.status(404).send('Not found');
    return;
  }

  const normalized = normalizeSlug(Array.isArray(slug) ? slug[0] : slug);
  const fileName = `devis-${normalized}.html`;
  const filePath = path.join(ROOT, fileName);

  if (fs.existsSync(filePath)) {
    const location = `/devis-${normalized}`;
    res.writeHead(308, {
      Location: location,
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    });
    res.end();
    return;
  }

  res.status(404).send('Not found');
};

