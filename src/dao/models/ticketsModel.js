import mongoose from "mongoose";

const collection = "tickets";

const ticketsSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    purchase_datetime: Date,
    amount:Number,
    purchaser:{
        type:String,
        required:true
    }
});

const ticketsModel = mongoose.model(collection, ticketsSchema);

export default ticketsModel;