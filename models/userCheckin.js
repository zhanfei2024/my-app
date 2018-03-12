module.exports = function (sequelzie, DataTypes) {
    return sequelzie.define(
        'usercheckin', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unicode: true
        },
        userId: {
            type: DataTypes.BIGINT,
            field: 'user_id',
            unicode: true,
            reference: {
                model: 'user',
                key: 'id'
            },
            comment: '用户id'
        },
        loginIp: {
            type: DataTypes.STRING,
            field: 'login_ip',
            allowNull: false,
            defaultValue: '',
            validate: {isIP: true},
            comment:'登录I'
        }
    }, {
        underscored: true,
        timestamps: true,
        tableName: 'userCheckin',
        comment: '用户登录信息',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        indexes: [{
            name: 'userCheckin_userId',
            method: 'BTREE',
            fields: ['user_id']
        }]
    })
}