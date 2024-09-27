'use strict';
const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Gabrielly Catarina Márcia Costa',
        sexo: 'Feminino',
        cpf: '13827628792',
        data_nascimento: '1980-03-03',
        email: 'gabrielly_catarina_costa@lins.net.br',
        password: await hash('RnGLYZFgc4', 8),
        cep: '69307540',
        endereco: 'Rua da Tamarineira',
        numero: '786',
        bairro: 'Caçari',
        cidade: 'Boa Vista',
        estado: 'Roraima',        
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        nome: 'Gustavo Benjamin Kauê Silveira',
        sexo: 'Masculino',
        cpf: '01881920267',
        data_nascimento: '1983-07-01',
        email: 'gustavobenjaminsilveira@icloub.com',
        password: await hash('kZQtCCWEQ0', 8),
        cep: '12603100',
        endereco: 'Rua Jovino Balbino da Silva',
        numero: '993',
        bairro: 'Vila Nunes',
        cidade: 'Lorena',
        estado: 'São Paulo',   
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        nome: 'Fernando Emanuel Thomas Galvão',
        sexo: 'Masculino',
        cpf: '63678947050',
        data_nascimento: '2001-05-11',
        email: 'fernandoemanuelgalvao@raninho.com.br',
        password: await hash('1w4rPx3yrO', 8),
        cep: '77019534',
        endereco: 'Quadra 1204 Sul Alameda 9',
        numero: '110',
        bairro: 'Plano Diretor Sul',
        cidade: 'Palmas',
        estado: 'Tocantins',   
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        nome: 'Raimundo João Iago da Mata',
        sexo: 'Masculino',
        cpf: '12871723427',
        data_nascimento: '1995-05-13',
        email: 'raimundo_damata@yahoo.com .br',
        password: await hash('SMyMfrUrgX', 8),
        cep: '69313415',
        endereco: 'Rua Tenente Alencar',
        numero: '663',
        bairro: 'Cambará',
        cidade: 'Boa Vista',
        estado: 'Roraima',   
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        nome: 'Cláudia Heloisa Monteiro',
        sexo: 'Feminino',
        cpf: '30292857071',
        data_nascimento: '1995-11-22',
        email: 'claudia.heloisa.monteiro@recantoalmeida.com.br',
        password: await hash('L6iR6Cfx3O', 8),
        cep: '69915150',
        endereco: 'Travessa Fagundes Varela',
        numero: '497',
        bairro: 'Conjunto Esperança',
        cidade: 'Rio Branco',
        estado: 'Acre',   
        createdAt: new Date,
        updatedAt: new Date
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});

  }
};
