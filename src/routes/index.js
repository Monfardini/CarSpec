const express = require('express');
const router = express.Router();

// Importar rotas individuais
const usuarioRoutes = require('./usuarios');
const carroRoutes = require('./carros');
const montadoraRoutes = require('./montadoras');

// Usar rotas com prefixos
router.use('/usuarios', usuarioRoutes);
router.use('/carros', carroRoutes);
router.use('/montadoras', montadoraRoutes);

module.exports = router;
