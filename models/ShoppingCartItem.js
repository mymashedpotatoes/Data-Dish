module.exports = (sequelize, DataTypes) => {
    const ShoppingCartItem = sequelize.define("shoppingCartItem", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0 // a default value for amount
        },
        unit: {
            type: DataTypes.STRING // Add unit attribute
        }
    });
        ShoppingCartItem.associate = (models) => {
            Ingredient.belongsTo(models.ShoppingCart, { foreignKey: 'recipeId', as: 'recipe' });
        };
    return ShoppingCartItem;
}