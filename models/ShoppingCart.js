module.exports = (sequelize, DataTypes) => {
    const ShoppingCart = sequelize.define("ShoppingCart", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ShoppingCart.associate = (models) => {
        ShoppingCart.hasMany(models.ShoppingCartItem, { as: 'items' });
    };

    return ShoppingCart;
};