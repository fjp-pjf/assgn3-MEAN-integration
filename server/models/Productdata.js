const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NewProductSchema = new Schema({
    productId : Number,
    productName : String,
    productCode : String,
    releaseDate : String,
    description : String,
    price : Number,
    starRating : Number,
    imageUrl : String
});


const Productdata = mongoose.model('product',NewProductSchema);
module.exports = Productdata;
