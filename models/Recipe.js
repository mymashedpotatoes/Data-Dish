module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("Recipe", {
        name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        servingSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activeRecipe: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    Recipe.associate = (models) => {
        Recipe.hasMany(models.Ingredient, { as: 'ingredients' });
    };
    return Recipe;
}