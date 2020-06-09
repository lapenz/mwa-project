const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Coupon', couponSchema);