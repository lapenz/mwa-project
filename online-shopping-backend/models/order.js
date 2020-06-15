const Schema = mongoose.Schema;
const AddressSchema = require('../models/address');

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
    billingAddress: AddressSchema,
    shippingAddress: AddressSchema,
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