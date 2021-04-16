const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

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


(async () => {
    await User.sync({ alter: true });
});



User === sequelize.models.User;
module.exports = User;