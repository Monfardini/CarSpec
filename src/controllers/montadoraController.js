const { Montadora } = require('../models');

// Listar todas as montadoras
const listarMontadoras = async (req, res) => {
  try {
    const montadoras = await Montadora.findAll();
    res.json(montadoras);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar montadoras.' });
  }
};

// Buscar uma montadora específica por ID
const buscarMontadora = async (req, res) => {
  const { id } = req.params;
  try {
    const montadora = await Montadora.findByPk(id);
    if (!montadora) {
      return res.status(404).json({ error: 'Montadora não encontrada.' });
    }
    res.json(montadora);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar montadora.' });
  }
};

// Criar uma nova montadora
const criarMontadora = async (req, res) => {
  const { nome, pais } = req.body;
  try {
    const novaMontadora = await Montadora.create({ nome, pais });
    res.status(201).json(novaMontadora);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar montadora.' });
  }
};

// Editar uma montadora existente
const editarMontadora = async (req, res) => {
  const { id } = req.params;
  const { nome, pais } = req.body;
  try {
    const montadora = await Montadora.findByPk(id);
    if (!montadora) {
      return res.status(404).json({ error: 'Montadora não encontrada.' });
    }
    montadora.nome = nome || montadora.nome;
    montadora.pais = pais || montadora.pais;
    await montadora.save();
    res.json(montadora);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar montadora.' });
  }
};

// Excluir uma montadora
const deletarMontadora = async (req, res) => {
  const { id } = req.params;
  try {
    const montadora = await Montadora.findByPk(id);
    if (!montadora) {
      return res.status(404).json({ error: 'Montadora não encontrada.' });
    }
    await montadora.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir montadora.' });
  }
};

module.exports = {
  listarMontadoras,
  buscarMontadora,
  criarMontadora,
  editarMontadora,
  deletarMontadora,
};
