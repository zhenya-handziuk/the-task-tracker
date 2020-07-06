module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Tasks', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING(20),
            values: ["View", "In Progress", "Done"],
            defaultValue: "View"
        },
        userId: {
            type: DataTypes.INTEGER,
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

    Task.associate = function(models) {
        Task.belongsTo(models.Users, {
            as: 'Users', foreignKey: 'userId'
        })
    };

    return Task;
}
