module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('user', {
        unique_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        id: {
            type: DataTypes.STRING
        },
        illumination: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        humidity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        temperature: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        soil_humidity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
            }
        }
    });

    return User;
};

