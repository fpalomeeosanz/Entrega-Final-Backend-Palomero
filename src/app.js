import express  from "express";
import { options } from "./config/config.js";
import { dbConection } from "./config/dbConection.js";

//APP
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//SERVER
const server = app.listen(options.server.port, ()=>{
    console.log('Servidor todavia funcionando en el puerto ochenta ochenta');
})
//BDD
dbConection();
