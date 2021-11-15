const is_admin = (req, res, next) =>{
    if(res.locals.isAdmin){
        next()
    }
    else{
        return res.redirect('/');
    }
}
module.exports = is_admin;