'use strict';
module.exports = (sequelize, DataTypes) => {
    var UserCompany = sequelize.define('UserCompany', {
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
        industryId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            comment:'行业id'
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'公司名'
        },
        companyEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            comment:'公司邮箱' },
        mobile: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '公司电话'
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '公司地址'
        },
        scopeOfOperation: {
          type: DataTypes.STRING,
          allowNull: false,
          comment: '经营范围'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
            comment:'是否正常状态'
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
            comment: '是否是默认账户'
        }
    }, {
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        tableName: 'UserCompany',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
    UserCompany.associate = function(models) {
        // associations can be defined here
        UserCompany.belongsTo(models.user, {
            targetKey: 'id',
            foreignKey: 'userId',
            onDelete: 'cascade',
            as: 'user'
        });

        UserCompany.belongsTo(models.industry, {
            targetKey: 'id',
            foreignKey: 'industryId',
            as: 'industry'
        })
    };

    // Instance Method
    UserCompany.prototype.toJSON = function () {
        const res = this.dataValues;

        // 隐藏字段
        delete res.createdAt;
        delete res.updatedAt;
        delete res.deletedAt;
        return res;
    };

    return UserCompany;
};