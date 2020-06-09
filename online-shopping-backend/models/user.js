const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const role = require('../util/role');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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
    birthDate: Date,
    role: String,
    isApprovedUser: Number,
    cart: { type: Schema.Types.ObjectId,
        ref: 'Cart'
    }

});


userSchema.statics.addUser = function(user){

    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
    user.isApprovedUser = user.role == role.Seller ? 0 : 1;

    return this.create(user);

}

userSchema.statics.isValidAddUser = function(userparam){
    const user = this.findOne({ username: userparam.username });
    if(user) return false;

    return true;
}

module.exports = mongoose.model('User', userSchema);