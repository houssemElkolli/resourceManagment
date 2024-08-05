"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Client.init(
        {
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    isUnique: async function (value) {
                        const existingClient = await Client.findOne({
                            where: { email: value },
                        });
                        if (existingClient) {
                            const error = new Error("This email already exists!")
                            error.status = 401
                            throw error;
                        }
                    },
                },
            },
            date_of_birth: {
                type: DataTypes.DATE,
                allowNull: true,
                validate: {
                    isDate: true,
                },
            },
        },
        {
            sequelize,
            modelName: "Client",
        }
    );
    return Client;
};
