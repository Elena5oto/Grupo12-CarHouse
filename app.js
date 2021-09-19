let express = require("express");
let app = express();
let path = require("path");
let publicPath = path.join(__dirname,"./public");
/*const port = 3030;*/

app.use(express.static(publicPath));

app.listen(process.env.PORT || 3030,()=>console.log("servidor en linea http://localhost:3030"));

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get('/carrito.html', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/carrito.html"))
});

