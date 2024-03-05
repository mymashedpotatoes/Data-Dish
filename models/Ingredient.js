module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Ingredient.associate = (models) => {
        Ingredient.belongsTo(models.Recipe, { foreignKey: 'recipeId', as: 'recipe' });
    };
    return Ingredient;
}