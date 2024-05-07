import mongoose from "mongoose";

const collection = "users";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
    rol: {
        type: String,
        enum: ["user","admin","premiun" ],
        default: "user"
    },
    
});

const usersModel = mongoose.model(collection, userSchema);

export default usersModel;