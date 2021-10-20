const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProjectUser extends Model { }

ProjectUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            },
        },
        project_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'project',
                key: 'id',
                unique: false
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'projectUser',
    }
);

module.exports = ProjectUser