const Schema = mongoose.Schema;

const Status = Object.freeze({
    PENDING: 'Pending',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELED: 'Canceled'
});

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
        enum: Object.values(Status),
        default: Status.PENDING
    },
    cart: {type: Object, required: true},
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

Object.assign(orderSchema.statics, {
    Status
});

module.exports = mongoose.model('Order', orderSchema);