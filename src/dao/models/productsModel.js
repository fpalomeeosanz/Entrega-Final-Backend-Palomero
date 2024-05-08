import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const productsSchema= new mongoose.Schema({
    code: {type: String,required:true},
    price: { type: Number,required:true,min:1},
    description: { type: String, required: true },
    stock: {type: Number,required:true},
    thumbnail: { type: String, required: true },
    category:{ type: String,required:true,enum: ['Hospedaje', 'Salon', 'Actividades', 'Delicias', 'Eventos']},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, productsSchema);

export default productsModel; 