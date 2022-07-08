//importando modulos
const express =  require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require ('dotenv');

//setting listening port
app.set('port',process.env.PORT || 3000);

//dotenv config
dotenv.config();

//DB Connection
const dir = process.env.DATABASE;
const options = {useNewUrlParser:true,useUnifiedTopology:true};
mongoose.connect(dir,options)
	.then(()=>{
		console.log("Conectado a la base de datos");
	})
	.catch((error)=>{
		console.log('error al conectarse a MongoDB: ',error);
	});


//Set home route
app.get("/",function(req,res){
	res.send("running")
});

app.listen(app.get("port"),function(){
	console.log("listening port:" + app.get("port"));
});
