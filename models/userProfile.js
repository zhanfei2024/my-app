'use strict';
module.exports = (sequelize, DataTypes) => {
    var UserProfile = sequelize.define('UserProfile', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true,
            unique : true,
            comment:'公司id'
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment:'用户id'
        },
        countryId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment:'地区id'
        },
        profileName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'姓名'
        },
        gender: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false,
            comment:'性别' },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '出生日期'
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '电话'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '邮箱'
        },
        IdType: {
          type: DataTypes.ENUM('id', 'driver', 'pass', 'passport'),
          allowNull: false,
          comment: '证件类型'
        },
        IdNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'证件号码'
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '头像'
        }
    }, {
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'UserProfile',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
    UserProfile.associate = function(models) {
        // associations can be defined here
    };
    return UserProfile;
};