const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    //Mitzio
    home: (req, res) =>{
        res.render('home');
    }, 
    product: (req, res) =>{
        res.render('productDetail')
    },
    list_of_products: (req, res)=>{
        res.render('list_of_products')
    },

    //Carlos
    carrito: (req, res) =>{
        res.render('carrito')
    },
    
    cargarProducto: (req, res) => {
        const {name, title, description, price, image}= req.body;
        let ids= products.map(p=>p.id)
        let newProduct= {
            id: Math.max(...ids)+1,
            name,
            title,
            description,
            price,
            image
        }
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/paquetes');
    },

    //Gerardo
    register: (req, res) => {
        res.render('register')
    },
    
    CargaEdicionProducto: (req, res) => {
        res.render('productsload')
    },

    
    
    //Elena   
    login:( req, res)=> {
        res.render('login')
    },
}

module.exports = controller; 