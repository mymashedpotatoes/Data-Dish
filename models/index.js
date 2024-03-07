const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const RecipeModel = require("./Recipe");
const IngredientModel = require("./Ingredient");
const ShoppingCartItemModel = require("./ShoppingCartItem");
const ShoppingCartModel = require("./ShoppingCart");

const Recipe = RecipeModel(sequelize, Sequelize);
const Ingredient = IngredientModel(sequelize, Sequelize);
const Date = require("./Date")
const User = require("./User")
const ShoppingCartItem = ShoppingCartItemModel(sequelize, Sequelize);
const ShoppingCart = ShoppingCartModel(sequelize, DataTypes);

Ingredient.belongsTo(Recipe);
Recipe.hasMany(Ingredient);
ShoppingCart.hasMany(ShoppingCartItem);
ShoppingCartItem.belongsTo(ShoppingCart);

module.exports = {
    Recipe,
    Ingredient,
    Date,
    User,
    ShoppingCart,
    ShoppingCartItem,
    sequelize
};