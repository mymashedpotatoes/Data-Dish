module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "G"
        }
    })
    Ingredient.associate = (models) => {
        Ingredient.belongsTo(models.Recipe, { foreignKey: 'recipeId', as: 'recipe' });
    };
    return Ingredient;
}