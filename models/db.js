var pg=require("pg");
var exec = require('child_process').exec;
function conPG(callback){
	var conString = "postgres://postgres:123456@localhost/spatial";
	var client = new pg.Client(conString);
	client.connect(function(err,db) {
		if(err){
			console.log("连接失败");
			callback(err,null);
		}
		else{
			console.log("连接成功");
			callback(err,db)
		}

	})
}

exports.queryPos=function(params,callback){
	var conString = "postgres://postgres:123456@localhost/spatial";
	var client = new pg.Client(conString);
	client.connect(function(err) {
		if(err) {
			console.log("连接失败");
		}
		else{
			console.log(params["posName"]);
			//"SELECT ST_AsGeoJSON(geom),gid FROM beijing_points where  posdate >"+params["startTime"]+"vehiclenum='"+params["posName"]+"'"
			var sql="SELECT ST_AsGeoJSON(geom),gid FROM beijing_points where  posdate <'"+params["startTime"]+"'"+"and vehiclenum='"+params["posName"]+"'";
				console.log(sql);
			client.query(sql, function(err, result) {
				if(err) {
					callback("查询失败",null);
					return console.error('error running query', err);
				}
				else{
					client.end();
					callback(err,result);
					return;
				}
			})
		}

	});
};
function  getCurrentime(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hours=date.getHours();
	var min=date.getMinutes();
	var second=date.getSeconds();
	var str=year+""+month+""+strDate+""+hours+""+min+""+second;
	return str;
}
exports.insertToDB=function(name,callback){
	var time=getCurrentime();
	var cmd='cd /d "E:/postsql/bin>" && shp2pgsql -W "GBK" E:/node-work/0306/uploads/'+name+'.shp  '+name+' >C:/tcc/viwpt.sql && psql -d spatial -f C:/tcc/viwpt.sql postgres';
	exec(cmd, function(error, stdout, stderr) {
		if(error){
			console.log(error);
		}
		else{
			callback();
			console.log("成功");
		}
	});
}

