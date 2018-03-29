'use strict';
module.exports = (sequelize, DataTypes) => {
    var UserExperience = sequelize.define('UserExperience', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true,
            unique : true,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment:'用户id'
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'公司名称'
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'职位名称'
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '开始时间'
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '结束时间'
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '工作描述'
        }
    }, {
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'UserExperience',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
    UserExperience.associate = function(models) {
        // associations can be defined here
    };
    return UserExperience;
};