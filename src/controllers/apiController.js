const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const controller = {

// Products
Products: (req, res) =>{
  
    db.Products.findAll()
    .then(results =>{
        results.map(result =>{
            result.dataValues.detail = '/products/' + result.dataValues.id
        })
        return res.json({
        count: results.length,
        products: results})
    })

},
Detail_product: (req, res)=>{
    let id = req.params.id;
    
    db.Products.findByPk(id)
    .then(results =>{
        
        results.dataValues.Url_image = '/images/products/' + results.dataValues.image
        
        return res.json({product: results})
    })
 
    



}





// Users




}






module.exports = controller; 