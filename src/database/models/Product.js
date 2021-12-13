module.exports = (sequalize, dataTypes) => {

    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false, 
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true,
        },

    };
    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequalize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Purchases, {
            as: "purchase",
            foreignKey: "id"
        })
    }

    return Product;
}