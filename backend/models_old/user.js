/* global sequelize */
const { DataTypes } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//});



const User = sequelize.define('User', {

    // Model attributes are defined here
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false

    },
    avatar: {
        type: DataTypes.STRING

    },
    role: {
        type: DataTypes.INTEGER

    }

}, {
    tableName: 'users'
});

User === sequelize.models.User;
//User.sync();


module.exports = User;