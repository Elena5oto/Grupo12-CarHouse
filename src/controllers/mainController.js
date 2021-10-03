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

    //Elena   

}

module.exports = controller; 