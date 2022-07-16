//getting external modules
const express =  require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const dotenv = require ('dotenv');

//getting internal modules.
const routes = require('./routes/routes');


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

//middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Setting routes
app.use("/api",routes);

//Instruccion de prueba inicial
//app.get("/",function(req,res){
//	res.send("running")
//});

//middleware para vue
app.use(history());
app.use(express.static(path.join(__dirname,'public')));



app.listen(app.get("port"),function(){
	console.log("listening port:" + app.get("port"));
});
