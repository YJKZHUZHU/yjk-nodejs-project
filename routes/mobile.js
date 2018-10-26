var express = require('express')
var router = express.Router()
var phoneModel = require('../model/phoneModels')
const multer = require('multer')
const upload = multer({
	dest: 'G:/third/phoneimg'
})
const fs = require('fs')
const path = require('path')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'

//品牌写入
router.post('/add', upload.single('phonephoto'), function(req, res) {
	console.log(req.body)
	console.log(req.file)
	var fileName = new Date().getTime() + '_' + req.file.originalname
	fs.readFile(req.file.path, function(err, data) {
		if(err) {
			console.log('文件读取失败', err)
		} else {
			var des_file = path.resolve(__dirname, '../public/phoneimg', fileName)
			console.log(des_file)
			fs.writeFile(des_file, data, function(err) {
				if(err) {
					console.log('写入失败', err)
				} else {
					console.log('写入成功')
				}
			})

			phoneModel.addphone({
				phonephoto: fileName,
				phonenickname: req.body.phonenickname,
				phonebrand: req.body.phonebrand,
				officialprice: req.body.officialprice,
				usedprice: req.body.usedprice
			}, function(err) {
				if(err) {
					res.send(err)
				} else {
					res.send({
						code: 0,
						msg: '插入成功'
					})
				}
			})

		}
	})

})
router.get('/delete', function(req, res) {
	var id = JSON.parse(req.query.id)
	console.log(id)
	phoneModel.deletephone(id, function(err) {
		res.render('yjkerror', err)
	})
	res.redirect('/mobile-manager.html')
})

//手机品牌
router.post('/addbrand', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		if(err) {
			console.log('连接数据库失败')
			res.send({
				code: -1,
				msg: '网络异常，请稍后重试'
			})
		} else {
			var db = client.db('yjk')
			db.collection('brand').find().toArray(function(err, data) {
				if(err) {
					res.send({
						code: -2,
						msg: '数据库查询失败'
					})
				} else {
					res.send({
						code: 0,
						msg: '查询成功',
						data: data
					})
				}
			})
		}
	})
})
//修改
router.post('/modifier', function(req, res) {
	var id = JSON.parse(req.body.phonenid1) //转成numberleix
	console.log(id)
	req.body.phonenid1 = id
	console.log(req.body)
	phoneModel.modefier({
		tid: req.body.phonenid1,
		officialprice: req.body.officialprice,
		usedprice: req.body.usedprice
	}, function(err, data) {
		if(err) {
			res.render('werror', err);
		} else {
			console.log(data)
			res.redirect('/mobile-manager.html')
		}
	})
})
module.exports = router