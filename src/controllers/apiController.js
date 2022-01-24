const db = require('../database/models');
const path = require('path');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { log } = require('console');
const op = db.Sequelize.Op

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
        console.log(results);
        results.dataValues.Url_image = '/images/products/' + results.dataValues.image
        
        return res.json({product: results})
    })
 
    



},





// Users
 Users: (req, res) => {
     db.Users
        .findAll()
        .then(users =>{
        
            return res.status(200).json({
                total: users.length,
                data: users,
                status: 200
            })
        })
 },

 Detail_users: (req, res) => {
    db.Users
       .findByPk(req.params.id)
       .then(user =>{
        user.dataValues.Url_image = '/images/users/' + user.dataValues.image   
           return res.status(200).json({
               data: user,
               status: 200
           })
       })
},




}






module.exports = controller; 