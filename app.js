let express = require("express");
let app = express();
const mainroutes = require('./src/routes/mainRoutes.js');
const path = require("path")
const createError = require('http-errors');


app.listen(process.env.PORT || 3030,()=>console.log("servidor en linea http://localhost:3030"));

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname, "views"))

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




app.use('/', mainroutes);
app.use('/paquetes/producto', mainroutes)
app.use('/paquetes', mainroutes)
app.use('/carrito', mainroutes)
app.use('/register', mainroutes);
app.use('/productsload', mainroutes);
app.use('/login', mainroutes)


