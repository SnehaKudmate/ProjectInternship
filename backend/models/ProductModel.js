const mongoose = require('mongoose');
const {Schema} = mongoose;


const productSchema = new Schema({
    title: { type : String, required: true, unique: true},
    description: { type : String, required: true},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    highlights:{ type : [String] },
    deleted: { type : Boolean, default: false} ,
    skills: { type: [String], required: true },
    tenure: { type: String, required: true },
    location: { type: String, required: true }
    
})

const virtualId  = productSchema.virtual('id');



virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Product = mongoose.model('Product',productSchema)