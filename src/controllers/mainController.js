const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const tempUsersFilePath = path.join(__dirname, '../data/tempUsers.json');
const tempUsers = JSON.parse(fs.readFileSync(tempUsersFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    //Mitzio
    home: (req, res) =>{
        res.render('home');
    }, 
    product: (req, res) =>{
        let id = req.params.id;
        let producto = products.find(producto => producto.id == id);
        console.log(producto);
        res.render('productDetail', {product: producto})
    },
    list_of_products: (req, res)=>{
        console.log(products);
        res.render('list_of_products', {products : products })
    },

    //Carlos
    carrito: (req, res) =>{
        res.render('carrito')
    },
//carga de Productos nuevos------------------------------------------------------------
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
//---------------------------------------------------------------------------
//Edicion de Productos-------------------------------------------------------
    productsEdit: (req, res) => {
        let productToEdit = products.find(product=>product.id==req.params.id)
		res.render('productsEdit',{productToEdit,toThousand})
         },

    update: (req, res) => { 
        let ids= req.params.id;
        let productToEdit = products.find(product => product.id == ids)
        
        productToEdit = {
			id: productToEdit.id,
			...req.body,	
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/paquetes');
	},
//----------------------------------------------------------------------------------------

//login y validacion---------------------------------------------------------------------
      
        loginValidator: (req, res) =>{
           /* let errores = validationResult(req);
            if(!errores.isEmpty()){
                return res.render('login',
                {mensajesDeError: errores.mapped()})
                
            }
            */

        let email= req.body.email;
        let password = req.body.password
       
        let validationUser = {
            
            ...req.body
        }; 
       
        tempUsers.push(validationUser)
        fs.writeFileSync(tempUsersFilePath, JSON.stringify(tempUsers, null, ' '));
        res.redirect('/');
       
		
		
        
        //console.log(email)
        //console.log(password)
        console.log(validationUser)
    },
     
//---------------------------------------------------------------------------------------------


//registro----------------------------------------------------
    register: (req, res) => {
        res.render('register')
    },
    
    loadRegister: (req, res) =>{
        /*let errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.render('login_register',
            {mensajesDeError: errores.mapped(),
             old: req.body,
            })
           
        } */
        const {nombreCompleto, email, usuario, password}= req.body;
        let ids= users.map(p=>p.id)
        let newUser= {
            id: Math.max(...ids)+1,
            nombreCompleto,
            email,
            usuario,
            password,
            
        }
        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');
    },


    
    CargaEdicionProducto: (req, res) => {
        res.render('productsLoad')
    },

    
    
    //Elena   
    login:( req, res)=> {
        res.render('login')
    },

    //prueba
    login_register: (req, res) => {
        res.render('login_register')
    },
}

module.exports = controller; 