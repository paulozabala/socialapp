const express =  require('express');
const app = express();

app.set('port',3000);


app.get("/",function(req,res){
	res.send("running")
});

app.listen(app.get("port"),function(){
	console.log("listening port:" + app.get("port"));
});
