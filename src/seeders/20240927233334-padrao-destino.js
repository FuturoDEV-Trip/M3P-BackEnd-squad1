'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('destinos', [
      {
        usuario_id: 2,
        nome: 'Lagoa do Peri',
        descricao: 'A Lagoa do Peri é um corpo de água doce situada ao sudeste de Florianópolis, capital de Santa Catarina, entre uma cadeia de montanhas e o oceano Atlântico. É a maior lagoa da ilha de Santa Catarina - considerando que a Lagoa da Conceição, o maior corpo de água da ilha, é uma laguna salobra.',
        coordenadas_geo: '-27.7263057,-48.508475',
        cep: '88010102',
        cidade: 'Florianópolis',
        estado: 'Santa Catarina',
        pais: 'Brasil',      
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        usuario_id: 1,
        nome: 'Caverna do Pântano do Sul',
        descricao: 'Uma trilha de beleza inigualável com uma enorme e linda caverna uma das maiores da ilha com aproximadamente com dez metros de altura e 30 metros de profundidade. Sua entrada é gigantesca e vai se afunilando, até um pequeno túnel onde só se esgueirando para entrar.',
        coordenadas_geo: '-27.7897402,-48.509939',
        cidade: 'Florianópolis',
        estado: 'Santa Catarina',
        pais: 'Brasil',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        usuario_id: 3,
        nome: 'Dolmen da Oração',
        descricao: 'O Dólmen da Oração é um sítio arqueoastronomico no lado leste de Florianópolis, que representa um calendário astronomico dos antigos povos que viviam na região.',
        coordenadas_geo: '-27.5893554,-48.4338257',
        cep: '88061400',
        cidade: 'Florianópolis',
        estado: 'Santa Catarina',
        pais: 'Brasil',      
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        usuario_id: 1,
        nome: 'Morro do Lampião',
        descricao: 'Visual incrível do Sul da ilha, continente e parte da lagoa da Conceição',
        coordenadas_geo: '-27.6706284,-48.4967537',
        cep: '88063525',
        cidade: 'Florianópolis',
        estado: 'Santa Catarina',
        pais: 'Brasil',      
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('destinos', null, {});

  }
};
