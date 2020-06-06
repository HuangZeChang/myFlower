var mysql = require('mysql');

//var User = new Object();
var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
 
    database: 'test'
});
connect.connect(function(err){
   	  if(err){
   	  	console.log("[query]-:"+err);
   	  	return;
   	  }
   	  console.log("数据库连接成功！");
   });

module.exports = connect;