const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Montadora = sequelize.define('Montadora', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'montadoras',
    timestamps: false,
  });

  return Montadora;
};
