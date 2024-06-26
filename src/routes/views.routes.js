import { Router } from "express";
import { verifyEmailTokenMW } from "../middlewares/auth.js";
import usersModel from "../dao/models/usersModel.js";
import productsModel from "../dao/models/productsModel.js";
import { UserController } from "../controllers/users.controllres.js";
import { ProductsController } from "../controllers/product.controllers.js";
import cartsModel from "../dao/models/cartsModel.js";

const router = Router();

const publicAccess = (req,res,next) =>{
if(req.session.user){
    return res.redirect('/');
}
next();
}

const privateAccess = (req,res,next) =>{
    if(!req.session.user){
        return res.redirect('/login');
    }
    next();
}

router.get('/register', publicAccess, (req,res)=>{
    res.render('register')
});

router.get('/', publicAccess, (req,res)=>{
    res.render('home');
});

router.get('/login', publicAccess, (req,res)=>{
    res.render('login')
});

router.get('/profile', (req,res)=>{;
    res.render('profile', {user:req.session.user})
    
});

router.get("/forgot-password", (req,res)=>{
    res.render("forgotPassword")
});

router.get('/reset-password', verifyEmailTokenMW(), (req,res)=>{
    const token = req.query.token;
    res.render("resetPassword",{token})
});

router.get("/current", (req, res) => {
    const user = req.user;
    const { email, rol } = user; 
    res.render("current", { user: { email, rol } }); 
});

router.get('/users', async (req,res) => {
    
    const users = await usersModel.find().lean();
    
    res.render("users", {users, isAdmin: true})
});

router.get("/users/:uid", async (req, res) => {
    const userId = req.params.uid;
  
    const user = await UserController.findById(userId);
  
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
  
    res.render("user-profile", { user });
});

router.get('/products', async (req, res) => {

    const products = await productsModel.find().lean();
    res.render('products', {products});
});

router.get('/cart', async (req, res) => {
    
    const user = req.user;
    const { email, rol, cart} = user;
    const carrito = await cartsModel.findById(cart);
    
    let arreglo = [];

    for(let i=0; i< carrito.products.length; i++){
        const aux = await productsModel.findById(carrito.products[i].product);
        arreglo.push({
            code: aux.code,
            price: aux.price,
            cantidad: carrito.products[i].quantity
        });
    }
    res.render('cart', { 
        user: { email, rol, cart },
        cart: {products: arreglo}
    });
})

router.get('/cart/:pid', async (req, res) => {
    const pid = req.params.pid;
    const user = req.user;
    const { email, rol, cart} = user;
    const carrito = await cartsModel.findById(cart);
    let productInCart = false;
    for(let i=0; i< carrito.products.length; i++){
        if (carrito.products[i].product == pid){
            carrito.products[i].quantity++;
            productInCart = true;
            break;
        }
    }
    if(!productInCart){
        carrito.products.push({
            product: pid,
            quantity: new Number(1)
        });
    }
    
    carrito.save();
    
    let arreglo = [];
    for(let i=0; i< carrito.products.length; i++){
        const aux = await productsModel.findById(carrito.products[i].product);
        arreglo.push({
            code: aux.code,
            price: aux.price,
            cantidad: carrito.products[i].quantity
        });
    }
    res.render('cart', { 
        user: { email, rol, cart },
        cart: {products: arreglo}
    });
});

router.get('/purchase', async (req, res) => {
    res.render('purchase');
});

router.get('/end', async (req, res) => {
    res.render('end');
});

export { router as viewsRouter };