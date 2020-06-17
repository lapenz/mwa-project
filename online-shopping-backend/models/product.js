const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    reviews: [{
            description: { type: String , required: true},
            rating: { type: Number, required: true },
            buyer: { type: String , required: true},
            approved: { type: Number , required: true}
            }]
            

});


module.exports = mongoose.model('Product', productSchema);