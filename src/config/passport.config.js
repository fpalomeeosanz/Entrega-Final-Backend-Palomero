import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import usersModel  from "../dao/models/usersModel.js";
import cartsModel from "../dao/models/cartsModel.js"
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
 
const inicializePassport = () => {

    //PASSPORT LOCAL
    passport.use("signupStrategy", new LocalStrategy({
        passReqToCallback:true,
        usernameField:"email"},

        async ( req, username, password, done ) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            
            let user = await usersModel.findOne({email:username});
            if(user){
                console.log('Usuario ya registrado');
                return done(null,false)
            }
            //CREAR USER ROL
            let rol='user';
            if (username.endsWith("@coder.com")) {
                rol = "admin";
            }
            const cart = await cartsModel.create({});
            console.log(cart)

            const newUser = {
                first_name,
                last_name,
                email: username,
                age,
                cart: cart._id,
                password: createHash(password),
                rol
            }
            console.log(newUser)
            const userCreated = await usersModel.create(newUser);
            return done (null, userCreated);

        } catch (error) {
            return done(error);
        }    

    }));

    passport.use("loginStrategy", new LocalStrategy({
    usernameField:"email"},
    
    async (username, password, done)=>{
        try {
            const user = await usersModel.findOne({email:username})
            if(!user){
                return done(null, false);
            }
            if(!isValidPassword(password, user)){
                return done(null, false);
            } 
            return done(null,user)
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });

    passport.deserializeUser(async (id,done)=>{
        let user = await usersModel.findById(id);
        done(null, user);
    });

    //PASSPORT GITHUB
    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.514facd7ce886c08",
        clientSecret:"56881637e9a2a221631a807f39594c71724c73af",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accesToken, refreshToken,profile, done)=>{
        try {
            console.log(profile._json.name);
            const first_name = profile._json.name
            let email;
            if(!profile._json.email){
                email = profile.username;
            }

            let user = await usersModel.findOne({email:profile._json.email});
            if(user){
                console.log('Usuario ya registrado');
                return done(null,false)
            }

            const newUser = {
                first_name,
                last_name: "",
                email,
                age: 18,
                password: ""
            }
            const result = await usersModel.create(newUser);
            return done (null, result);

        } catch (error) {
            return done(error)
        }

    }));  
}

export default inicializePassport;