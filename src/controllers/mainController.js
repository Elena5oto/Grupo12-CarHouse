const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');
const db = require('../database/models');
const path = require('path');
const {validationResult} = require("express-validator");
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { log } = require('console');
let bcrypt= require('bcryptjs');





const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    //Mitzio
    home: (req, res) =>{
        res.render('home');
    }, 
    product: (req, res) =>{
        let id = req.params.id;
        db.Products.findOne({
            where: {
                id: id
            }
        })
        .then(product =>{
            console.log(product.description); 
            res.render('productDetail', {product: product})
        })
        
        
    },
    list_of_products: (req, res)=>{
        
    db.Products.findAll()
    .then(products =>{
        res.render('list_of_products', {products : products })
    })
        
    },
   

    //Carlos
    carrito: (req, res) =>{
        res.render('carrito')
    },
//carga de Productos nuevos------------------------------------------------------------
   cargarProducto: (req, res) => {
        let image 

        if(req.file != undefined){
            image = req.file.filename
        } else {
            image = 'Logo_white.png'
        }
        db.Products.findAll()
        .then(products =>{
            console.log(products);
            let ids= products.map(p=>p.id)
            let newProduct= {
                id: Math.max(...ids)+1,
                ...req.body,
                image: image
            }
            console.log(newProduct);
            db.Products.create(newProduct)
        })
        .catch(errors =>{
            console.log(errors);
        })
        // products.push(newProduct)
        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
       
        res.redirect('/paquetes');
    },
//---------------------------------------------------------------------------
//Edicion de Productos-------------------------------------------------------
    productsEdit: (req, res) => {
        let id = req.params.id;
        db.Products.findOne({
            where: {
                id: id
            }
        })
        .then(productToEdit =>{
            res.render('productsEdit',{productToEdit,toThousand})
        })
         },

    update: (req, res) => { 
        let id= req.params.id;
        let productToEdit
        let image
        db.Products.findOne({
            where: {
                id: id
            }
        })
        .then(product =>{
            console.log('hellosss');
            console.log(product.id);
            console.log(product.image);
            if(req.file != undefined){
                image = req.file.filename
            } else{
                image = product.image
            }
            productToEdit = {
                id: product.id,
                ...req.body,
                image : image
            };
            db.Products.update(productToEdit,{
                where: {id: id}
            })
            res.redirect('/paquetes');
        })
 
        
	},

    
    CargaEdicionProducto: (req, res) => {
        res.render('productsLoad')
    },

   /* delete: (req, res) =>{
        let ids = req.params.id;
        let finalProduct = products.filter(products =>products.id !=ids)
        fs.writeFileSync (productsFilePath,JSON.stringify(finalProduct,null," "))
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.redirect ('/paquetes');
       
    }, */

     delete: function(req,res) {
        db.Products.destroy({
                where:{id: req.params.id}
           })
        res.redirect('/paquetes')

        }

}

module.exports = controller; 