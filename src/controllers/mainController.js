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

    //Gerardo
    register: (req, res) => {
        res.render('register')
    },
    
    CargaEdicionProducto: (req, res) => {
        res.render('CargaEdicionProducto')
    },
    
    //Elena   
    login:( req, res)=> {
        res.render('login')
    },
}

module.exports = controller; 