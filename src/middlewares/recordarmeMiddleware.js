function recordarmeMiddleware( req, res, next){
    next();
    if (req.cookie.recordame != undefined &&
        req.session.userlogged == undefined){
            req.session.userlogged
        }
}
module.exports = recordameMiddleware