import {model, models, Schema} from "mongoose";

const ProductSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    price:{type:Number, required:true},
    discountRate: Number,
    image: [{type:String},],
    imageLink: [{type:String},],
    userName: {type:String, required:true},
},{ timestamps: true },
)
// const userSchema = new Schema({
//     email: {type: String,
//             unique: true,
//             required: true,
//     },
//     password: { type: String,
//                 required: true,
//                 select: fasle,
//     }
// })
export const Product =models.Product || model("Product", ProductSchema)
// export const User = models.User || model("User", userSchema)
console.log(ProductSchema)