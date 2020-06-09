const Schema = mongoose.Schema;


const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    billingAddress: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },  
    ShippingAddress: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    coupon: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coupon"
    },
    payment: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    },

});


module.exports = mongoose.model('Order', orderSchema);