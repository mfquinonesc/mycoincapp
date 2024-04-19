const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new  mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true
    },
    lastName: {
        type: String,
        required: true,
        uppercase: true,
    },    
    phone: {
        type: Number,
        required: true,
        unique: true
    },   
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    budget: {
        type: Number,
        required: true,
    },   
});

userSchema.pre('save', async function (next) {
    const rounds = 6;
    const salt = await bcrypt.genSaltSync(rounds);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.statics.validatePassword = async (email, password) => {
    const user = await this.findOne({ email: email });
    if (user) {
        return await bcrypt.compare(password, user.password);
    } else {
        return false;
    }
};

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;