const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");

const { log } = require('console');
let bcrypt= require('bcryptjs');





const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
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
        let image 

        if(req.file != undefined){
            image = req.file.filename
        } else {
            image = 'Logo_white.png'
        }

        let ids= products.map(p=>p.id)
        let newProduct= {
            id: Math.max(...ids)+1,
            ...req.body,
            image: image
        };
       
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
        let image
        if(req.file != undefined){
            image = req.file.filename
        } else{
            image = productToEdit.image
        }

        productToEdit = {
			id: productToEdit.id,
			...req.body,
            image : image
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect('/paquetes');
	},
//----------------------------------------------------------------------------------------

//login y validacion---------------------------------------------------------------------
      
        loginValidator: (req, res) =>{
            let errores = validationResult(req);
            console.log(errores);
            if(!errores.isEmpty()){
                return res.render('login_register',
                {mensajesDeError: errores.mapped(),
                old: req.body,
                })    
            }

        let userlogin = users.find(user => user.email == req.body.email)
        if(userlogin){
          
            if(bcrypt.compareSync(req.body.password, userlogin.password)){
                delete userlogin.password;
                req.session.userlog = userlogin;
                console.log(req.session.userlog);
                return res.redirect('/')
            }
        }
        return res.render('login_register',{
                    mensajesDeError: {
                        eror: {
                                msg: 'Las credenciales son invalidas'
                }
                }
                })
                
        
        
        console.log(req.body.email);
        console.log(userlogin);
        res.send(userlogin);


     

        
        //console.log(email)
        //console.log(password)
        // console.log(validationUser)

    },
     
//---------------------------------------------------------------------------------------------


//registro----------------------------------------------------
    register: (req, res) => {
        res.render('register')
    },
    
    loadRegister: (req, res) =>{
        let errores = validationResult(req);
        console.log(req.body)
        if(!errores.isEmpty()){
            return res.render('register_validation',
            {mensajesDeError: errores.mapped(),
             old: req.body,
            })
        } 

        let image 
        if(req.file != undefined){
            image = req.file.filename
        } else {
            image = 'default-user.png'
        }
        const {nombreCompleto, email, password, usuario}= req.body;
        let ids= users.map(p=>p.id)
        let newUser= {
            id: Math.max(...ids)+1,
            nombreCompleto,
            email,
            usuario,
            password: bcrypt.hashSync(req.body.password, 10),
            image: image
        }
        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');
    },


    
    CargaEdicionProducto: (req, res) => {
        res.render('productsLoad')
    },

    delete: (req, res) =>{
        let ids = req.params.id;
        let finalProduct = products.filter(products =>products.id !=ids)
        fs.writeFileSync (productsFilePath,JSON.stringify(finalProduct,null," "))
        products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.redirect ('/paquetes');
       
    },




    //Elena   
login:( req , res)=> {
        res.render('login')
    },


    //prueba
    login_register: (req, res) => {
        res.render('login_register')
    }
}

module.exports = controller; 