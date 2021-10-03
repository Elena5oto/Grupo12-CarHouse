let express = require("express");
let app = express();
const mainroutes = require('./src/routes/mainRoutes.js');
/*const port = 3030;*/
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.listen(process.env.PORT || 3030,()=>console.log("servidor en linea http://localhost:3030"));

app.use('/', mainroutes);
app.use('/producto', mainroutes)