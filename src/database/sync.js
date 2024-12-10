const { sequelize } = require('../models');

const sincronizarBancoDeDados = async () => {
  try {
    await sequelize.sync({ force: true }); // `force: true` recria as tabelas sempre que o script for executado
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
  } finally {
    await sequelize.close();
  }
};

sincronizarBancoDeDados();
