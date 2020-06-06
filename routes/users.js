var express = require('express');
var router = express.Router();
//var fs = require("fs");//引用文件系统模块
/* GET users listing. */

var db = require('../db/mysql_conn');
router.get('/:all', function(req, res, next) {
	var sql = 'SELECT * FROM flower';
	console.log("test");
	db.query(sql, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		console.log(result);
		console.log('--------------\n\n');
		res.send(result);
	});
});

//添加
router.put('/', function(req, res, next) {

	var addSql = 'INSERT INTO flower(Name,price,home) VALUES(?,?,?)';
	var flag = false;
	var query = req.query;
	var addSqlParams = [query.Name, query.price, query.home];
	db.query(addSql, addSqlParams, function(err, result) {
		if(err) {
			res.send("鲜花已在花库中!");
			return;
		}
		res.send("鲜花入库成功");
	});
});

//删除
router.delete('/', function(req, res, next) {
	var query = req.query;
	var delSql = 'DELETE FROM flower where id=?';

	db.query(delSql, query.id, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		res.send("success");
	});
});

//修改
router.patch('/', function(req, res, next) {
	var query = req.query;
	console.log(query.Name + "," + query.price + "," + query.home);
	var modSql = 'UPDATE flower SET Name = ?, price = ?, home = ? WHERE id = ?';
	var modSqlParams = [query.Name, query.price, query.home, query.id];
	db.query(modSql, modSqlParams, function(err, result) {
		 if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
         console.log("success");
         return;
	});
	//     res.send(query);
});

//查询
router.post('/', function(req, res, next) {
	var query = req.query.text;
	console.log(query);
	var sql = `SELECT * FROM flower where Name like '%${query}%'`;
	db.query(sql, function(err, result) {
		if(err) {
			console.log('[SELECT ERROR] - ', err.message);
			return;
		}
		res.send(result);
	});
});

module.exports = router;