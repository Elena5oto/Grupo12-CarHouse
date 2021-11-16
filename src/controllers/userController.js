const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");

const { log } = require('console');
let bcrypt= require('bcryptjs');





const tempUsersFilePath = path.join(__dirname, '../data/tempUsers.json');
const tempUsers = JSON.parse(fs.readFileSync(tempUsersFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

     
    login_register: (req, res) => {
        res.render('login_register')
    },

    profile: (req, res)=>{
        res.render('profile', {user: req.session.userlog})
    },

    logout: (req,res) =>{
        req.session.destroy();
        return res.redirect('/');
    },


      
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
          let checkuser = {...userlogin};
            if(bcrypt.compareSync(req.body.password, userlogin.password)){
                checkuser.password = null;
                req.session.userlog = checkuser;
                 if (req.body.recordarme != undefined){
                res.cookie('recordarme',
                userlogin.email, {maxAge: 10000*60})
            }  
                return res.redirect('/');

             
            }
        }
        return res.render('login_register',{
                    mensajesDeError: {
                        eror: {
                                msg: 'Las credenciales son invalidas'
                }
                }
                })
 
    },
     

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

 
}

module.exports = controller; 