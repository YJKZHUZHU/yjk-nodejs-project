var express = require('express')
var router = express.Router()
var brandModel = require('../model/brandModels')
const multer = require('multer')

const upload = multer({
	dest: 'G:/img/'
})
const fs = require('fs')
const path = require('path')
//添加品牌
router.post('/addbrand', upload.single('phonelogo'), function(req, res) {
	console.log(req.body)
	console.log(req.file)
	var fileName = new Date().getTime() + '_' + req.file.originalname;
	fs.readFile(req.file.path, function(err, data) {
		if(err) {
			console.log('文件读取失败', err)
		} else {

			var des_file = path.resolve(__dirname, '../public/phone/', fileName)
			console.log(des_file)
			fs.writeFile(des_file, data, function(err) {
				if(err) {
					console.log('写入失败', err)
				} else {
					console.log('写入成功')
				}
			})
		}
	})
	brandModel.addbrand({
		brandname: req.body.brandname,
		brandlogo: fileName
	}, function(err) {
		if(err) {
			res.send(err);
		} else {
			res.send({
				code: 0,
				msg: '插入成功'
			});
		}
	})
})
router.get('/delete', function(req, res) {
	var id = JSON.parse(req.query.id)
	console.log(id)
	brandModel.deletebrand(id, function(err) {
		res.render('yjkerror', err)
	})
	res.redirect('/brand-manager.html')
})
module.exports = router;
