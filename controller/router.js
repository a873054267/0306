var file=require("../models/file.js");
var fs = require("fs");

var db=require("../models/db.js");

exports.showIndex=function(req,res){
    res.render("index.ejs",{
        "albums":["aa","bb","cc"]
    });
};

exports.showAlbum=function(req,res){
    res.send("相册"+req.params.albumName);
};
//查询定位点
exports.query=function(req,res){
    var params=req.query;
    db.queryPos(params,function(err,result){
        res.json(result);
    })
};

//上传文件
exports.upload=function(req,res){
    file.uploadFiles(req,function(fileName){
        var filesName=fileName[0];
        var k=filesName.lastIndexOf(".");
        var filesNameWithoutExt= filesName.substring(0,k);
        db.insertToDB(filesNameWithoutExt,function(){});
        var fileurl="E:/node-work/0306/uploads";
        res.end("上传成功");
    })
};