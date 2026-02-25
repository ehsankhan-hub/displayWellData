const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/api/getLogHeaders/:well/:wellbore', (req, res) => {
  const { well, wellbore } = req.params;
  const db = router.db;
  const headers = db.get('logHeaders')
    .filter(header => header['@uidWell'] === well && header['@uidWellbore'] === wellbore)
    .value();
  
  res.json(headers);
});

// Use default router
server.use(router);

// Start server
const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
  console.log('API endpoint available: http://localhost:3000/api/getLogHeaders/:well/:wellbore');
});
