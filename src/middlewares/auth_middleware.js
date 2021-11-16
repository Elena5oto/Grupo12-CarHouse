const auth = (req, res, next) =>{
    if(!req.session.userlog){
        return res.redirect('/user/login_register');
    }
    next()
}
module.exports = auth;