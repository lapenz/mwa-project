const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Product', userSchema);