'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('destinos', { 
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coordenadas_geo: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull:false
      }
    });     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('destinos');  
  }
};
