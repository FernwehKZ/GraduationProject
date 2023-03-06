const express = require('express');
const multer = require('multer') //上传所需组件
const bcrypt = require('bcrypt')
const JWT = require('../../util/jwt')
//本地图片路径
const upload = multer({dest: __dirname + '/../../uploads/userIcon'}).single('file')
const router = express.Router(); //express子路由，方法写这
const User = require('../../model/UserModel')

module.exports = app => {
    //注册用户
    router.post('/register', async (req, res) => {
        const model = await User.create(req.body)
        res.send(model)
    })
    //上传头像
    router.post('/upload', upload, async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/userIcon/${file.filename}`
        res.send(file)
    })

    //登录
    router.post('/login', async (req, res) => {
        const {name, password} = req.body //解构赋值
        // 根据用户名找用户
        const AdminUser = require('../../model/UserModel')
        const User = await AdminUser.findOne({name}).select('+password')
        if (!User) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        // 校验密码
        //bcrypt模块加密,compareSync比较是否匹配
        const isValid = bcrypt.compareSync(password, User.password)
        if (!isValid) return res.status(422).send({
            message: '密码错误'
        })
        // 返回token
        const token = JWT.generate({
            id: User._id,
        })
        res.send(token)
    })
    //显示用户信息
    router.get('/user', async (req, res)=> {
        // const file = req.file
        // file.url = `http://localhost:3000/uploads/${file.filename}`
        const userData = await User.find().limit(10)
        res.send(userData)
    });
    //删
    router.delete('/user', async (req, res)=> {
        await User.findByIdAndDelete(req.body._id)
        res.send({
            success:true,
        })
    });
    //改
    router.put('/user', async (req, res)=> {
        const model = await User.findByIdAndUpdate(req.body._id,req.body)
        res.send(model)
    });
    app.use('/admin/api', router)//挂载到路由上
}
