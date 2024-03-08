const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const RecipeModel = require("./Recipe");
const IngredientModel = require("./Ingredient");
const ShoppingCartItemModel = require("./ShoppingCartItem");
const ShoppingCartModel = require("./ShoppingCart");

const Recipe = RecipeModel(sequelize, Sequelize);
const Ingredient = IngredientModel(sequelize, Sequelize);
const Day = require("./Day");
const User = require("./User");
const Meal = require("./Meal");
const ShoppingCartItem = ShoppingCartItemModel(sequelize, Sequelize);
const ShoppingCart = ShoppingCartModel(sequelize, DataTypes);

Ingredient.belongsTo(Recipe);
Recipe.hasMany(Ingredient);
ShoppingCart.hasMany(ShoppingCartItem);
ShoppingCartItem.belongsTo(ShoppingCart);

Meal.belongsTo(Day, {
    foreignKey: "id",
});

Day.hasMany(Meal, {
    foreignKey: "meal_date",
});



module.exports = {
    Recipe,
    Ingredient,
    Day,
    User,
    Meal,
    ShoppingCart,
    ShoppingCartItem,
    sequelize
};