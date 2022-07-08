//importando modulos
const express =  require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');


//setting listening port
app.set('port',process.env.PORT || 3000);

//DB Connection
const dir = 'mongodb+srv://socialite:socialinput@cluster0.mjixm.mongodb.net/?retryWrites=true&w=majority'; 
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
