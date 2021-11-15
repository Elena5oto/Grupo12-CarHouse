const user_logged = (req, res, next) =>{
    res.locals.isLogged= false;
    res.locals.isAdmin = false;

    if(req.session.userlog){
        res.locals.isLogged = true;
        if(req.session.userlog.id == 1){
            res.locals.isAdmin = true;
        }
    }
    next();
}
module.exports = user_logged;