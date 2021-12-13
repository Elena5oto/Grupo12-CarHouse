module.exports = (sequalize, dataTypes) => {

    let alias = "Users";
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
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true,
        },

    };
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequalize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Purchases, {
            as: "purchase",
            foreignKey: "id_user"
        })
    }

    return User;
}