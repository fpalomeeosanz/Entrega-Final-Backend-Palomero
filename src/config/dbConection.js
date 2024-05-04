import mongoose from "mongoose";
import { options } from "./config.js";


export const dbConection = async()=>{
try {
  await mongoose.connect(options.mongo.url)
  console.log("Conexion exitosa con la BDD");
} catch (error) {
    console.log(`Hubo un error conectandose a la base ${error}`);
}
};