'use strict'

module.exports = (sequelize, DataTypes) => {
    var Industry = sequelize.define('Industry', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        parentId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        depth: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'Industry',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    return Industry;
}