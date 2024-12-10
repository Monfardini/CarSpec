const bcrypt = require('bcrypt');
const { Usuario } = require('../models/usuario');

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

// Buscar um usuário específico por ID
const buscarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

// Criar um novo usuário
const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};

// Editar um usuário existente
const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar usuário.' });
  }
};

// Excluir um usuário
const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    await usuario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};

module.exports = {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  editarUsuario,
  deletarUsuario,
};
