
const mongoose=require('mongoose');

const dataSchama = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String, required : true},
    email: { type: String, required : true, match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    phone:{type: Number, required: true},
    course:{type: String, required:true}
    
});

module.exports = mongoose.model('Data', dataSchama);