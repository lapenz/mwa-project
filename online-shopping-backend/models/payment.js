const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    
    paymentMethod:{
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }

});


module.exports = mongoose.model('Payment', paymentSchema);