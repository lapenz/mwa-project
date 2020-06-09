const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const role = require('../util/role');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    
    totalPrice: {
        type: Number,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        },
    }]
    
    

});




module.exports = mongoose.model('Cart', cartSchema);