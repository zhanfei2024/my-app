'use strict';

var sequelize=require('./_db').sequelize();
var User = sequelize.import('./user.js');
var UserCheckin = sequelize.import('./userCheckin.js');
var UserAddress = sequelize.import('./userAddress.js');
var Role = sequelize.import('./role.js');
var UserProfile = sequelize.import('./userProfile.js');
var UserEducation = sequelize.import('./userEducation.js');
var UserExperience = sequelize.import('./userExperience.js');
var UserCompany = sequelize.import('./userCompany.js');
var UserIndustry = sequelize.import('./industry.js');

// 建立模型之间的关系
User.hasOne(UserCheckin);
UserCheckin.belongsTo(User);
User.hasMany(UserAddress, {foreignKey:'user_id', targetKey:'id', as:'Address'});
User.belongsToMany(Role, {through: 'userRoles', as:'UserRoles'});
Role.belongsToMany(User, {through: 'userRoles', as:'UserRoles'});

// 同步模型到数据库中
async function mysqlInit() {
    try {
        await sequelize.sync()
    } catch (err) {
        next(err)
    }
};
module.exports = {
    mysqlInit,
    User,
    UserCheckin,
    UserAddress,
    Role,
    UserProfile,
    UserEducation,
    UserExperience,
    UserCompany,
    UserIndustry
}
