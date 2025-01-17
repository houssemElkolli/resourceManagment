"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Role.hasMany(models.User, {
                foreignKey: "roleId",
                sourceKey: "id",
            });
        }
    }
    Role.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true },
            },
        },
        {
            sequelize,
            modelName: "Role",
        }
    );
    return Role;
};
