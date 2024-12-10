const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carroController');

// Rotas para CRUD de carros
router.get('/', carroController.listarCarros); // Consultar todos os carros
router.get('/:id', carroController.buscarCarro); // Consultar um carro específico
router.post('/', carroController.criarCarro); // Criar um novo carro
router.put('/:id', carroController.editarCarro); // Editar um carro
router.delete('/:id', carroController.deletarCarro); // Excluir um carro

// Rota para cadastro de carro
router.post('/cadastro', async (req, res) => {
     const { modelo, ano, montadoraId } = req.body;
     try {
       const carro = await Carro.create({ modelo, ano, montadoraId });
       res.status(201).json(carro);
     } catch (error) {
       res.status(500).json({ error: 'Erro ao cadastrar carro' });
     }
   });
   
   // Rota para editar carro
   router.put('/:id', async (req, res) => {
     const { id } = req.params;
     const { modelo, ano, montadoraId } = req.body;
     try {
       const carro = await Carro.findByPk(id);
       if (carro) {
         carro.modelo = modelo;
         carro.ano = ano;
         carro.montadoraId = montadoraId;
         await carro.save();
         res.status(200).json(carro);
       } else {
         res.status(404).json({ error: 'Carro não encontrado' });
       }
     } catch (error) {
       res.status(500).json({ error: 'Erro ao editar carro' });
     }
   });
   
   // Rota para consulta de carros com cruzamento de tabela (Montadora)
   router.get('/', async (req, res) => {
     try {
       const carros = await Carro.findAll({
         include: {
           model: Montadora,
           as: 'montadora',
           attributes: ['nome'],
         },
       });
       res.status(200).json(carros);
     } catch (error) {
       res.status(500).json({ error: 'Erro ao listar carros' });
     }
   });

module.exports = router;

