const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');
const path = require('path');
const {validationResult} = require("express-validator");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
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
        console.log(req.session.userlog.image);
        
        res.render('profile', {user: req.session.userlog})
    },

    logout: (req,res) =>{
        res.clearCookie('recordarme');
        req.session.destroy();
        return res.redirect('/');
    },


      
    loginValidator: (req, res) =>{
        
        let errores = validationResult(req);

            if(!errores.isEmpty()){
                return res.render('login_register',
                {mensajesDeError: errores.mapped(),
                old: req.body,
                })    
            }
            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user =>{
                let checkuser = {...user['dataValues']};
                console.log('hola');
                console.log(checkuser);
                console.log('hola2');
                if(bcrypt.compareSync(req.body.password, user.password)){
                    checkuser.password = null;
                    req.session.userlog = checkuser;
                    if (req.body.recordarme != undefined){
                    res.cookie('recordarme', userlogin.email, {maxAge: 10000*60})
                
                }
                return res.redirect('/');}
                return res.render('login_register',{
                    mensajesDeError: {
                        eror: {
                                msg: 'Las credenciales son invalidas'
                }
                }
                
            })
        })
            .catch(errors =>{
          return res.render('login_register',{
                     mensajesDeError: {
                         eror: {
                                 msg: 'Las credenciales son invalidas'
                 }
                 }
               })
 
    })
},
        
        // let userlogin = users.find(user => user.email == req.body.email)
        // if(userlogin){
        //   let checkuser = {...userlogin};
        //     if(bcrypt.compareSync(req.body.password, userlogin.password)){
        //         checkuser.password = null;
        //         req.session.userlog = checkuser;
        //          if (req.body.recordarme != undefined){
        //         res.cookie('recordarme',
        //         userlogin.email, {maxAge: 10000*60})
                
        //     }  
        //         return res.redirect('/');

             
        //     }
        // }
    //     return res.render('login_register',{
    //                 mensajesDeError: {
    //                     eror: {
    //                             msg: 'Las credenciales son invalidas'
    //             }
    //             }
    //             })
 
    // },
     

    register: (req, res) => {
        res.render('register')
    },
    
    loadRegister: (req, res) =>{
        
        
        let errores = validationResult(req);
        
        
        
        let image = null; 
        
        if (req.file != undefined){
        
            let extension = req.file.mimetype 
            if(extension == 'image/jpeg' || extension == 'image/jpg' || extension == 'image/png' || extension == 'image/gif'){
                
                image = req.file.filename;
            }
            else{
                
                 errores.errors.push({
                     msg:'Suba una imagen de tipo : .jpg, .png, jpeg o .gif'
                 })
                 
            }
            
        } else {
            image = 'default-user.png'
        }

        if(!errores.isEmpty()){
            return res.render('register_validation',
            {mensajesDeError: errores.mapped(),
             old: req.body,
            })
        } 
        
        const {name, email, username, password}= req.body;
        
        console.log(req.body);
        
        db.Users.findAll()
        .then(users =>{
            console.log(users);
        let ids= users.map(p=>p.id)
        let newUser= {
            id: Math.max(...ids)+1,
            name,
            email,
            username,
            password: bcrypt.hashSync(req.body.password, 10),
            image: image
        }
        
        db.Users.create(newUser)
        })



        // let ids= users.map(p=>p.id)
        // let newUser= {
        //     id: Math.max(...ids)+1,
        //     name,
        //     email,
        //     username,
        //     password: bcrypt.hashSync(req.body.password, 10),
        //     image: image
        // }
        // users.push(newUser)
        // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
        res.redirect('/');
    },

 
}

module.exports = controller; 


