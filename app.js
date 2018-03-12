var express = require("express");
var app = express();


var router=require("./controller/router");

app.use(express.static('public'));



app.get("/",function(req,res){
	res.sendFile(__dirname+"\\public"+"\\tra.html");
})
app.get("/queryRoad/:id",router.query);
app.post("/upload",router.upload);
				
app.listen(3000);
console.log("正在监听http:\\localhost\:"+3000);
