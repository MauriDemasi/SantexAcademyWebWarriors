const express = require('express');

// // Middlewares:
// const rootPath = require('../middleware/root_path.middleware');
// const errors = require('../middleware/error_handler.middleware');

const routes = express();

// Rutas
const catalogoRouter = require('./catalogo');
const orgRoutes = require('./organizaciones');
const userRoutes = require('./usuario');
const productRouter = require('./producto');

routes.use('/ping', (req, res) => {
  res.json({
    response: 'pong!',
  });
});

routes.use('/catalogo', catalogoRouter);
routes.use('/org', orgRoutes);
routes.use('/productos', productRouter);
routes.use('/user', userRoutes);

// routes.use('/', rootPath.handler);
// routes.use(rootPath.setHeaders);
// routes.use(errors.handler);



module.exports = routes;
