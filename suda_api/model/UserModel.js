const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
    name:{type:String},
    phone:{type:Number},
    password:{
        type:String,
        select:false,
        set(val){
            //加密
          return bcrypt.hashSync(val,10)
        },
    },
    age:{type:Number},
    sex:{type:String},
    icon:{type:String},
    sup:{type:Boolean},
})

module.exports = mongoose.model('User',schema)