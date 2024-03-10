const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Day extends Model { }

Day.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        week: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weekday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'day',
    });

    module.exports = Day;