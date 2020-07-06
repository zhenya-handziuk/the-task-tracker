module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Tasks, {
            as: 'Tasks', foreignKey: 'userId'
        });
    }

    return User;
}
