const express = require('express');
const router = express.Router();
const { Usuario } = require('../models/usuario');  // Adicionando a importação do modelo
const usuarioController = require('../controllers/usuarioController');

// Rotas para CRUD de usuários
router.get('/', usuarioController.listarUsuarios); // Consultar todos os usuários
router.get('/:id', usuarioController.buscarUsuario); // Consultar um usuário específico
router.post('/', usuarioController.criarUsuario); // Criar um novo usuário
router.put('/:id', usuarioController.editarUsuario); // Editar um usuário
router.delete('/:id', usuarioController.deletarUsuario); // Excluir um usuário

// Rota para cadastro de usuário
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario && usuario.senha === senha) {
      // Implementação de autenticação com sessão
      req.session.user = usuario;
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

// Rota para editar dados do usuário
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.nome = nome;
      usuario.email = email;
      usuario.senha = senha;
      await usuario.save();
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar usuário' });
  }
});

module.exports = router;


