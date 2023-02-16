const express = require("express");


module.exports = app =>{
  const express = require('express');
  const router = express.Router(); //express子路由，方法写这
  const Movie = require('../../model/MovieModel')


  router.post('/movie', async (req, res)=> {
    const model = await Movie.create(req.body)
    res.send(model)
    console.log("Post end")
  });

  app.use('/admin/api',router)
}
