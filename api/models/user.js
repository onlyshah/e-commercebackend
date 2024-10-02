const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type:String, require:true ,unique: true, match:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },
    password:{type:String, require:true},
    firstName:{type:String, require:true},
    lastName:{type:String,require:true},
    mobileNo:{type:Number,require:true},
    Address:[{
        Country:{type:String,require:true},
        Street:{type:String,require:true},
        City:{type:String,require:true},
        State:{type:String,require:true},
        Postcode:{type:Number,require:true},
        addresstype:{type:String, require:true}
    }
    

    ],
    token: { type: String }  // Add this field to store the token

});
const UserModel = new mongoose.model('User', userSchema);
module.exports = UserModel;
