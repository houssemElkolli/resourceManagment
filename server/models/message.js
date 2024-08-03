"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Message.init(
        {
            object: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: false },
            importance_status: {
                type: DataTypes.ENUM,
                allowNull: true,
                values: ["low", "medium", "high"],
            },
        },
        {
            sequelize,
            modelName: "Message",
        }
    );
    return Message;
};
