const Schema = mongoose.Schema;


const userSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


module.exports = mongoose.model('Order', userSchema);