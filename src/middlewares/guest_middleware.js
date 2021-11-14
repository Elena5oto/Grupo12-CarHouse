const guest = (req, res, next) =>{
    if(req.session.userlog){
        return res.redirect('/');
    }
    next()
}
module.exports= guest;