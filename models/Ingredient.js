module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Ingredient.associate = (models) => {
        Ingredient.belongsTo(models.Recipe, {as: "recipe" })
    };
    return Ingredient;
}