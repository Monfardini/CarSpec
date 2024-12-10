const { Sequelize } = require('sequelize');
const usuarioModel = require('./usuario');
const carroModel = require('./carro');
const montadoraModel = require('./montadora');

const sequelize = new Sequelize('car_spec_db', 'root', 'password'/*TODO:mudar para a senha do banco de dados do sequelize*/, {
  host: 'localhost',
  dialect: 'mysql',
});

// Inicialização dos modelos
const Usuario = usuarioModel(sequelize);
const Carro = carroModel(sequelize);
const Montadora = montadoraModel(sequelize);

// Relacionamentos
Carro.belongsTo(Montadora, { foreignKey: 'montadoraId', as: 'montadora' });
Montadora.hasMany(Carro, { foreignKey: 'montadoraId', as: 'carros' });

module.exports = {
  sequelize,
  Usuario,
  Carro,
  Montadora,
};
