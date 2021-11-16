const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function recordarmeMiddleware( req, res, next){
    next();
    if (req.cookies.recordarme != undefined &&
        req.session.userlog == undefined){
            
            let usuarioALoguearse
            for (let i=0; i<users.lenght; i++){
                if(user[i].email == req.cookies.recordarme){
                    usuarioALoguearse = users[i];
                    break;
                }
            }
            req.session.userlog = usuarioALoguearse
        }

    }
module.exports = recordarmeMiddleware;