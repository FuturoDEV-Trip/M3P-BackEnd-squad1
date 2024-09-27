const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')
const cpfCheck = require('cpf-check')
const { hash } = require('bcrypt')

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            validaCpf(cpf) {
                if (!cpfCheck.validate(cpf)) {
                    throw new Error('CPF inválido')
                }
            }
        }
    },
    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }    
})

Usuario.beforeSave(async (usuario) => {    
    usuario.password = await hash(usuario.password, 8)
    return usuario    
})

module.exports = Usuario
