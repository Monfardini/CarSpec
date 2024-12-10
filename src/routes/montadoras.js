const express = require('express');
const router = express.Router();
const montadoraController = require('../controllers/montadoraController');

// Rotas para CRUD de montadoras
router.get('/', montadoraController.listarMontadoras); // Consultar todas as montadoras
router.get('/:id', montadoraController.buscarMontadora); // Consultar uma montadora específica
router.post('/', montadoraController.criarMontadora); // Criar uma nova montadora
router.put('/:id', montadoraController.editarMontadora); // Editar uma montadora
router.delete('/:id', montadoraController.deletarMontadora); // Excluir uma montadora

// Rota para cadastrar uma montadora
router.post('/cadastro', async (req, res) => {
     const { nome, pais } = req.body;
     try {
       const montadora = await Montadora.create({ nome, pais });
       res.status(201).json(montadora);
     } catch (error) {
       res.status(500).json({ error: 'Erro ao cadastrar montadora' });
     }
   });
   
   // Rota para editar uma montadora
   router.put('/:id', async (req, res) => {
     const { id } = req.params;
     const { nome, pais } = req.body;
     try {
       const montadora = await Montadora.findByPk(id);
       if (montadora) {
         montadora.nome = nome;
         montadora.pais = pais;
         await montadora.save();
         res.status(200).json(montadora);
       } else {
         res.status(404).json({ error: 'Montadora não encontrada' });
       }
     } catch (error) {
       res.status(500).json({ error: 'Erro ao editar montadora' });
     }
   });
   
   // Rota para listar todas as montadoras
   router.get('/', async (req, res) => {
     try {
       const montadoras = await Montadora.findAll();
       res.status(200).json(montadoras);
     } catch (error) {
       res.status(500).json({ error: 'Erro ao listar montadoras' });
     }
   });

module.exports = router;
