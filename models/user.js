'use strict';
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
  };
  return user;
};