module.exports = (sequalize, dataTypes) => {

    let alias = "Purchases";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        event_date: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        purchase_date: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        

    };
    let config = {
        tableName: "purchases",
        timestamps: false
    }

    const Purchase = sequalize.define(alias, cols, config);

    Purchase.associate = function(models){
        Purchase.hasMany(models.Products, {
            as: "products",
            foreignKey: "id_product"
        })
    }

    Purchase.associate = function(models){
        Purchase.belongsTo(models.Users, {
            as: "user",
            foreignKey: "id_user"
        })
    }


    return Purchase;
}