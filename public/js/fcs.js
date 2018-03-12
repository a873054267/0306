 var exec = require('child_process').exec;
 var fs=require("fs");
 function  execute(){

     var cmd=' cd /d "E:/postsql/bin>" && shp2pgsql -W "GBK" E:/node-work/0306/uploads/beijing_points.shp   6beijing_points >C:/tcc/viwpt.sql && psql -d spatial -f C:/tcc/viwpt.sql postgres';
     var cmd2= 'cd /d "E:/postsql/bin>" && shp2pgsql -W "GBK" E:/node-work/0306/uploads/beijing_points.shp  20183814599 >C:/tcc/viwpt.sql && psql -d spatial -f C:/tcc/viwpt.sql postgres';
     exec(cmd2, function(error, stdout, stderr) {
         if(error){
             console.log(error);
         }
         else{
             console.log("成功");
         }
     });
 }
 execute2();
 function  execute2(){

     }