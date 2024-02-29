module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("Recipe", {
        name: {
            type:DataTypes.STRING,
            allowNull: false
        }
    });
    Recipe.associate = (models) => {
        Recipe.hasMany(models.Ingredient);
    };
    return Recipe;
}