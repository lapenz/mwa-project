const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Methods = Object.freeze({
    DEBIT: 'Debit Card',
    CREDIT: 'Credit Cardr',
    PAYPAL: 'Paypal'
});

const paymentSchema = new Schema({
    
    paymentMethod:{
        type: String,
        enum: Object.values(Methods),
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }

});

Object.assign(paymentSchema.statics, {
    Methods
});

module.exports = mongoose.model('Payment', paymentSchema);