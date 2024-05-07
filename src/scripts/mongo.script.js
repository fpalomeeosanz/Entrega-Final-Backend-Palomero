import mongoose from "mongoose";
import productsModel from "../dao/models/productsModel.js";
import { dbConection }  from "../config/dbConnection.js";

dbConection();

const updateProducts = async()=>{
    try {
        const adminId = "648b8e10e6c8a1536f40ec00";
        const result = await productsModel.updateMany({},{$set:{owner:adminId}});
        console.log("result", result);
    } catch (error) {
        console.log(error.message);
    }
}
updateProducts();