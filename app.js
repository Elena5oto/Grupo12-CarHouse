let express = require("express");
let app = express();
const mainroutes = require('./src/routes/mainRoutes.js');
const userroutes = require('./src/routes/userRoutes.js');
const productroutes = require('./src/routes/productRoutes.js');
const apiroutes = require('./src/routes/apiRoutes.js')
const path = require("path")
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride =  require('method-override');
let session = require('express-session');
let userlogged_middleware = require('./src/middlewares/userlogged_middleware');
let recordarmeMiddleware = require('./src/middlewares/recordarmeMiddleware');


app.listen(process.env.PORT || 3030,()=>console.log("servidor en linea http://localhost:3030"));

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname, "views"));

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(methodOverride('_method')); 
app.use(session({secret:'secreto',
resave: false,
saveUninitialized: false}));
app.use(recordarmeMiddleware);
app.use(userlogged_middleware);



app.use('/', mainroutes);
app.use('/paquetes/producto', mainroutes)
app.use('/paquetes', mainroutes)
app.use('/carrito', mainroutes)

app.use('/paquetes/productsLoad', mainroutes);

app.use('/paquetes/producto/productsEdit', mainroutes);
app.use('/user', userroutes);
app.use('/api', apiroutes)



