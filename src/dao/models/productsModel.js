import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productsSchema= new mongoose.Schema({
    title: {type: String,required:true},
    price: { type: Number,required:true,min:1},
    description: { type: String, required: true },
    code: {type: String,required:true},
    stock: {type: Number,required:true},
    image: { type: String, required: true },
    category:{ type: String,required:true,enum: ['Hospedaje', 'Alimentacion','Experiencias']},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, productsSchema);

export default productsModel; 