"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: "roleId",
                targetKey: "id",
            });
        }
    }
    User.init(
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true },
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    isUnique: async function (value) {
                        const existingUser = await User.findOne({
                            where: { email: value },
                        });
                        if (existingUser) {
                            throw new Error("This email already exists!");
                        }
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true, min: 5 },
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    customValidator(value) {
                        if (typeof value !== "number") {
                            throw new Error("role must be a number");
                        }
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
