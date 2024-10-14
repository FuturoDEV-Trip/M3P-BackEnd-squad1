const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const Usuario = require("./Usuario");

const Destino = connection.define("destinos", {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordenadas_geo: {
    type: DataTypes.STRING,
  },
  cep: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Destino;
