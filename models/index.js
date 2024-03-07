const {Sequelize} = require("sequelize");
const sequelize = require("../config/connection");


const RecipeModel = require ("./Recipe");
const IngredientModel =require ("./Ingredient");


const Recipe = RecipeModel(sequelize, Sequelize);
const Ingredient = IngredientModel(sequelize, Sequelize);
const Date = require("./Date")
const User = require("./User")

Ingredient.belongsTo(Recipe);
Recipe.hasMany(Ingredient);


module.exports = {
    Recipe,
    Ingredient,
    Date,
    User,
    sequelize
};