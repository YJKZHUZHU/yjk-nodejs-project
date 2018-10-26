var express = require('express');
var router = express.Router();
var usersModel = require('../model/usersModels');
var Publish = require('../publish')
var phoneModel = require('../model/phoneModels');
var brandModel = require('../model/brandModels')
// 首页
router.get('/', function(req, res, next) {
	console.log('返回的操作是否有进来');
	// 判断用户是否已经登录，如果登录就返回首页，否则返回 登录页面
	if(req.cookies.username) {
		// 需要将 用户登录信息，传递给页面

		Publish.find(function(err, publish) {
			if(err) {
				return res.status(500).send('Server error.')
			}
			res.render('index', {
				username: req.cookies.username,
				nickname: req.cookies.nickname,
				isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',
				comments: publish
			});
		})
	} else {
		// 跳转到登陆页面
		res.redirect('/login.html');
	}

});

// 注册页面
router.get('/register.html', function(req, res) {
	res.render('register');
});

// 登录页面
router.get('/login.html', function(req, res) {
	console.log('登录页面进来');
	res.render('login');
})

// 用户管理页面
router.get('/user-manager.html', function(req, res) {
	let page = req.query.page || 1; // 页码
	let pageSize = req.query.pageSize || 4; // 每页显示的条数

	usersModel.getUserList({
		page: page,
		pageSize: pageSize
	}, function(err, data) {
		if(err) {
			res.render('yjkerror', err);
		} else {
			res.render('user-manager', {
				username: req.cookies.username,
				nickname: req.cookies.nickname,
				isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',

				userList: data.userList,
				totalPage: data.totalPage,
				page: data.page
			});
		}
	});
})
//渲染品牌管理页面
router.get('/brand-manager.html', function(req, res) {
	let page = req.query.page || 1; // 页码
	let pageSize = req.query.pageSize || 5; // 每页显示的条数
	console.log(page)
	brandModel.getphonebrandList({
		page: page,
		pageSize: pageSize
	}, function(err, data) {
		if(err) {
			res.render('yjkerror', err);
		} else {
			res.render('brand-manager', {
				username: req.cookies.username,
				nickname: req.cookies.nickname,
				isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',

				userList: data.userList,
				totalPage: data.totalPage,
				page: data.page
			});
		}
	})
})
// 手机管理页面
router.get('/mobile-manager.html', function(req, res) {
	let page = req.query.page || 1; // 页码
	let pageSize = req.query.pageSize || 3; // 每页显示的条数
	console.log(page)
	phoneModel.getphoneList({
		page: page,
		pageSize: pageSize
	}, function(err, data) {
		if(err) {
			res.render('yjkerror', err);
		} else {
			res.render('mobile-manager', {
				username: req.cookies.username,
				nickname: req.cookies.nickname,
				isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',

				userList: data.userList,
				totalPage: data.totalPage,
				page: data.page
			});
		}
	})
})

// 渲染添加评论页面
router.get('/publish.html', function(req, res) {
	console.log('留言页面进来了')
	res.render('publish')
})
router.post('/post', function(req, res) {
	Publish.save(req.body, function(err) {
		if(err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/')
	})
})

//删除
router.get('/delete', function(req, res) {
	var id = JSON.parse(req.query.id);
	usersModel.delete(id, function(err) {
		if(err) {
			res.render('yjkerror', err);
		}
	})
	res.redirect('/user-manager.html');
})
//渲染修改数据页面
router.get('/modification.html', function(req, res) {

	res.render('modification')
})

//渲染搜索页面
router.get('/search.html', function(req, res) {
	let page = req.query.page || 1; // 页码
	let pageSize = req.query.pageSize || 3; // 每页显示的条数
	let nickname = req.query.nickname
	console.log(typeof nickname)
	usersModel.search({
		page: page,
		pageSize: pageSize,
		nickname: nickname
	}, function(err, data) {
		if(err) {
			res.render('yjkerror', err);
		} else {
			if(data.userList.length != 0) {
				res.render('search', {
					username: req.cookies.username,
					nickname: req.cookies.nickname,
					isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',
					userList: data.userList,
					totalPage: data.totalPage,
					page: data.page
				});
			} else {
				res.render('yjkerror', {
					code: -103,
					msg: '昵称不存在'
				})
			}

		}
	});

})
module.exports = router;