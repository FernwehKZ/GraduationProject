const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{type:String},
    category:{type:Array},
    icon:{type:String},
    actor:{type:String},
    director:{type:String},
    price:{type:Number},
    date:{type:Array},
    introduce:{type:String}
})

module.exports = mongoose.model('Movie',schema)
