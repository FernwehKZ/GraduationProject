const express = require("express");
const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./config/db_config')(app)
require('./routes/admin/movie')(app)
require('./routes/admin/category')(app)
require('./routes/admin/user')(app)


app.listen(3000,()=>{
    console.log('http://localhost:3000')
});
