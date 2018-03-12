/**
 * Created by Administrator on 2017/12/11.
 */
var fs=require("fs");
var path=require("path");
var multiparty=require("multiparty");
exports.getAllAlbums=function(){
    fs.readdir("./upload",function(err,files){
        var allAlbums=[];
        console.log("123");
        fs.readdir(__dirname+"./upload",function(err,files){
                    //files是个文件名的数组，并不是文件的数组，表示./album这个文件夹中的所有东西
                     //包括文件、文件夹
                     for(var i = 0 ; i < files.length ;i++){
                            var thefilename = files[i];
                            //又要进行一次检测
                            fs.stat("./album/" + thefilename , function(err,stats){
                                   //如果他是一个文件夹，那么输出它：
                                   if(stats.isDirectory()){
                                          allAlbums.push(thefilename);
                                      }
                                  console.log(allAlbums);
                               });
                       }
             });


    });
}
exports.uploadFiles=function(req,callback){
    var fileName=[];
    var form = new multiparty.Form({
        uploadDir: './uploads'
    });
    form.on('error', function(err) {
        console.log('Error parsing form: ' + err.stack);
    });
    form.on('file', function (name, file) {

        fs.rename(file.path, './uploads/' + file.originalFilename, function(err) {
            if(err){
                console.log('rename error: ' + err);
            } else {
                fileName.push(file.originalFilename);
                callback(fileName);
            }
        });
    })
    form.parse(req);

};
exports.deleteAllFiles=function(fileUrl){

    var files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function(file){
        var stats = fs.statSync(fileUrl+'/'+file);
        if(stats.isDirectory()){
            emptyDir(fileUrl+'/'+file);
        }else{
            fs.unlinkSync(fileUrl+'/'+file);
            console.log("删除文件"+fileUrl+'/'+file+"成功");
        }

    })
}
