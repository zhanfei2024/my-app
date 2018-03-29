'use strict';
module.exports = (sequelize, DataTypes) => {
    var UserEducation = sequelize.define('UserEducation', {
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
        educationLevel:{
            type: DataTypes.ENUM('any', 'master', 'college', 'degree', 'post-graduate', 'shcool-certificate', 'doctor'),
            allowNull: false,
            comment:'教育等级'
        },
        schoolName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'学校名称'
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'专业' },
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
            comment: '在校描述'
        }
    }, {
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'UserEducation',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
    UserEducation.associate = function(models) {
        // associations can be defined here
    };
    return UserEducation;
};