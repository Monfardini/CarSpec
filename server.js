const express = require('express');
const session = require('express-session');
const usuariosRoutes = require('./routes/usuario');
const carrosRoutes = require('./routes/carro');
const montadorasRoutes = require('./routes/montadora');
const app = express();

// Configurações de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessões
app.use(session({
  secret: 'seu-segredo-aqui',
  resave: false,
  saveUninitialized: true,
}));

// Definindo as rotas
app.use('/usuario', usuariosRoutes);
app.use('/carro', carrosRoutes);
app.use('/montadora', montadorasRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

