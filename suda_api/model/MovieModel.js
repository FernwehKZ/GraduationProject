const mongoose = require("mongoose")
const Schema = mongoose.Mongoose.Schema;

//限制模型
const movieType = {
    movie_name:String,
    movie_actor:String,
    category:String,
    movie_price:Number,
    movie_date:String,
    movie_session:String,
    movie_introduce:String
}


const MovieModel = mongoose.model("Movie",new mongoose.Schema(movieType))

//模型user将会对应users集合
module.exports = MovieModel