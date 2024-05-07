import express  from "express";
import { options } from "./config/config.js";
import { dbConection } from "./config/dbConection.js";
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars';
import path from "path";

import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import { SECRET_SESSION } from "./config/options.js";

import { authRouter } from "./routes/auth.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { usersRouter } from "./routes/users.routes.js";

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

//HANDLEBARS
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//BDD
dbConection();

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl:options.mongo.url
    }),
    secret:SECRET_SESSION,
    resave:false,
    saveUninitialized:false
}));

//PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/", viewsRouter);
app.use("/api/sessions", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);