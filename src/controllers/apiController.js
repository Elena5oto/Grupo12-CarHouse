const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const controller = {

// Products
Products: (req, res) =>{
    let final;
    db.Products.findAll()
    .then(results =>{
        results.map(result =>{
            result.dataValues.detail = '/products/' + result.dataValues.id
        })
        return res.json({
        count: results.length,
        products: results})
    })

}





// Users




}






module.exports = controller; 