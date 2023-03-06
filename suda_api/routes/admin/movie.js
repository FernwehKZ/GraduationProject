const express = require('express');
const multer = require('multer') //上传所需组件
//本地图片路径
const upload = multer({dest: __dirname + '/../../uploads/movieIcon'}).single('file')
const router = express.Router(); //express子路由，方法写这
const Movie = require('../../model/MovieModel')
const User = require("../../model/UserModel");



module.exports = app => {
  //注册用户
  router.post('/movie', async (req, res) => {
    const model = await Movie.create(req.body)
    res.send(model)
  })
  //展示电影信息
  router.get('/movie', async (req, res)=> {
    const movieData = await Movie.find().limit(10)
    // movieData.category = movieData.category.join(",")
    res.send(movieData)
  });
  //删
  router.delete('/movie', async (req, res)=> {
    await Movie.findByIdAndDelete(req.body._id)
    res.send({
      success:true,
    })
  });
  //改
  router.put('/movie', async (req, res)=> {
    const model = await Movie.findByIdAndUpdate(req.body._id,req.body)
    res.send(model)
  });

  //上传头像
  router.post('/upload', upload, async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/movieIcon/${file.filename}`
    res.send(file)
  });
  app.use('/admin/api', router)//挂载到路由上

}
