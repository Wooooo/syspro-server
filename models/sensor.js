module.exports = function (sequelize, DataTypes) {

    var Data = sequelize.define('data', {
        unique_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        illumination: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        soil_humidity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true,
        timestamps: false,
        classMethods: {
            associate: function (models) {
            }
        }
    });

    return Data;
};

