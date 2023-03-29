const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Expense extends Model { }

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        expense_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expense_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "category",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "expense",
    }
);

module.exports = Expense;
