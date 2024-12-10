const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Carro = sequelize.define('Carro', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    montadoraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'montadoras', // Nome da tabela relacionada
        key: 'id',
      },
    },
  }, {
    tableName: 'carros',
    timestamps: false,
  });

  return Carro;
};
