//CfP2gm9DVTM4Yuux
const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');

mongoose.connect(MONGOURI,{
	 useNewUrlParser: true,
	 useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
	console.log("We are connected")
});
mongoose.connection.on('error',(err)=>{
	console.log("Error in connection",err)
});

require('./models/user');
require('./models/tips');
require('./models/plants')
require('./models/post');
require('./models/contest');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/myplants'));
app.use(require('./routes/post'));
app.use(require('./routes/contest'));
app.use(require('./routes/user'));
app.use(require('./routes/post'));


app.listen(PORT,()=>{
	console.log("server is running on ",PORT)
});
