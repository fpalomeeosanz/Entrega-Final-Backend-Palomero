import express  from "express";
import { options } from "./config/config.js";
import { dbConection } from "./config/dbConection.js";
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars';
import path from "path";

//APP
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static', express.static(__dirname + 'public'))

//SERVER
const server = app.listen(options.server.port, ()=>{
    console.log('Servidor todavia funcionando en el puerto ochenta ochenta');
})

//BDD
dbConection();

//HANDLEBARS
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

