const controller = {
    //Mitzio
    home: (req, res) =>{
        res.render('home');
    }, 
    product: (req, res) =>{
        res.render('productDetail')
    },

    //Carlos
    carrito: (req, res) =>{
        res.render('carrito')
    },

    //Gerardo
    register: (req, res) => {
        res.render('register')
    },
    
    //Elena   

}

module.exports = controller; 