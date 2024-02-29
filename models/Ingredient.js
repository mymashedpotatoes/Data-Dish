model.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Ingredient.associate = (models) => {
        Ingredient.belongsTo(models.Recipe)
    };
    return Ingredient;
}