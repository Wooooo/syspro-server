module.exports = function (sequelize, DataTypes) {

    var Photo = sequelize.define('photo', {
        unique_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        filename: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        mimetype: {
            type: DataTypes.STRING(50)
        },
        size: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.STRING
        }

    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
            }
        }
    });

    return Photo;
};

