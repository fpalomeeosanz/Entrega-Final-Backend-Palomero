import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const SECRET_SESSION = process.env.SECRET_SESSION;

export const options = {
    server:{
        port:process.env.PORT,
        secretSession:process.env.SECRET_SESSION,
    },
    gmail:{
        emailToken:process.env.SECRET_TOKEN_EMAIL,
        emailAdmin:process.env.EMAIL_ADMIN,
        emailPass:process.env.EMAIL_PASSWORD
    },
    mongo:{
        url:process.env.MONGO_URL
    }
};