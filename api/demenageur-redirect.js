const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const normalizeSlug = (value = '') => {
  const decoded = decodeURIComponent(value || '').replace(/\.html?$/i, '');
  return decoded
    .normalize('NFD')
    .replace(/[^\p{Letter}\p{Number}\-\s]/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
};

const sendFile = (res, filePath) => {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    });
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
};

module.exports = function handler(req, res) {
  const { slug = '' } = req.query;

  if (!slug) {
    res.status(404).send('Not found');
    return;
  }

  const raw = Array.isArray(slug) ? slug[0] : slug;
  const normalized = normalizeSlug(raw);
  const fileName = `demenageur-${normalized}.html`;
  const filePath = path.join(ROOT, fileName);

  if (!fs.existsSync(filePath)) {
    res.status(404).send('Not found');
    return;
  }

  const isCanonical = normalizeSlug(raw) === raw;

  if (isCanonical) {
    sendFile(res, filePath);
    return;
  }

  const location = `/demenageur-${normalized}`;
  res.writeHead(301, {
    Location: location,
    'Cache-Control': 'public, max-age=0, s-maxage=3600',
  });
  res.end();
};

