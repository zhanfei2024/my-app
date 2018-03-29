'use strict';
// library
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
      id:{
          type: DataTypes.INTEGER,
          autoIncrement:true,
          primaryKey : true,
          unique : true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          comment:'用户名'
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          comment:'用户密码' },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment:'是否正常状态'
      }
  }, {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
      tableName: 'user',
      charset: 'utf8',
      collate: 'utf8_general_ci'
  });
  user.associate = function(models) {
    // associations can be defined here
    user.hasOne(models.UserProfile, {
        targetKey: 'id',
        foreignKey: 'userId',
        onDelete: 'cascade',
        as: 'userProfile'
    });

    user.hasMany(models.UserExperience, {
        targetKey: 'id',
        foreignKey: 'userId',
        onDelete: 'cascade',
        as: 'userExperience'
    });

      user.hasMany(models.UserCompany, {
          targetKey: 'id',
          foreignKey: 'userId',
          onDelete: 'cascade',
          as: 'userCompany'
      });
      user.hasMany(models.UserEducation, {
          targetKey: 'id',
          foreignKey: 'userId',
          onDelete: 'cascade',
          as: 'userEducation'
      });
  };

    user.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    user.prototype.toJSON = function () {
        const res = this.dataValues;

        // hide field
        delete res.emailTokenUpdatedAt;
        delete res.password;
        delete res.updatedAt;

        return res;
    };
  return user;
};