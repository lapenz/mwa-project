const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
    address1:{
        type: String,
        required: true
    },
    address2:{
        type: String,
        required: true
    },

});


module.exports = mongoose.model('Address', addressSchema);