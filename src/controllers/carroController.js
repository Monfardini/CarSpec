const { Carro } = require('../models');

// Listar todos os carros
const listarCarros = async (req, res) => {
  try {
    const carros = await Carro.findAll();
    res.json(carros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar carros.' });
  }
};

// Buscar um carro específico por ID
const buscarCarro = async (req, res) => {
  const { id } = req.params;
  try {
    const carro = await Carro.findByPk(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar carro.' });
  }
};

// Criar um novo carro
const criarCarro = async (req, res) => {
  const { modelo, ano, montadoraId } = req.body;
  try {
    const novoCarro = await Carro.create({ modelo, ano, montadoraId });
    res.status(201).json(novoCarro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar carro.' });
  }
};

// Editar um carro existente
const editarCarro = async (req, res) => {
  const { id } = req.params;
  const { modelo, ano } = req.body;
  try {
    const carro = await Carro.findByPk(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }
    carro.modelo = modelo || carro.modelo;
    carro.ano = ano || carro.ano;
    await carro.save();
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar carro.' });
  }
};

// Excluir um carro
const deletarCarro = async (req, res) => {
  const { id } = req.params;
  try {
    const carro = await Carro.findByPk(id);
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }
    await carro.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir carro.' });
  }
};

module.exports = {
  listarCarros,
  buscarCarro,
  criarCarro,
  editarCarro,
  deletarCarro,
};
