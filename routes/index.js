var express = require('express');
var router = express.Router();
var usersModel = require('../model/usersModels');
var Publish = require('../publish')
// 首页
router.get('/', function(req, res, next) {
  console.log('返回的操作是否有进来');
  // 判断用户是否已经登录，如果登录就返回首页，否则返回 登录页面
  if (req.cookies.username) {
    // 需要将 用户登录信息，传递给页面
    
    Publish.find(function (err, publish) {
      if (err) {
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
  // 同首页，需要判断是否用户登录，并且判断用户是否是管理员
  if (req.cookies.username && parseInt(req.cookies.isAdmin)) {
    // 需要查询数据库
    // 从前端取得2个参数
    let page = req.query.page || 1; // 页码
    let pageSize = req.query.pageSize || 2; // 每页显示的条数

    usersModel.getUserList({
      page: page,
      pageSize: pageSize
    }, function(err, data) {
      if (err) {
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



  } else {
    res.redirect('/login.html');
  }
})

// 手机管理页面
router.get('/mobile-manager.html', function(req, res) {
  // 同首页，需要判断是否用户登录，并且判断用户是否是管理员
  if (req.cookies.username && parseInt(req.cookies.isAdmin)) {
    res.render('mobile-manager');
  } else {
    res.redirect('/login.html');
  }
})
// 渲染添加评论页面
router.get('/publish.html', function(req, res) {
  console.log('留言页面进来了')
  res.render('publish')
})
// router.get('/post.html', function (req, res) {
//   res.render('publish')
// })
router.post('/post', function (req,res) {
  // var comment = req.body
  // comment.dateTime = '2017-11-5 10:58:51'
  // comments.unshift(comment)
  // console.log(comment)
  // console.log(req.body)
  Publish.save(req.body, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/')
  })
})
router.get('/delete', function(req, res) {
  var id = JSON.parse(req.query.id);
  usersModel.delete(id,function(err) {
    if (err) {
      res.render('werror', err);
    }
  })
  res.redirect('/user-manager.html');
})
//渲染修改数据页面
router.get('/modification.html',function(req, res) {
  
  res.render('modification')
})
//修改数据
router.post('/modefication',function(req,res) {
  var id = JSON.parse(req.body.id)//转成numberleix
  var modimes = req.body
  req.body.id = id
  console.log(typeof req.body.id)
  console.log(modimes)
  usersModel.update(modimes,function(err) {
    if (err) {
      res.render('werror', err);
    }
  })
  res.redirect('/user-manager.html')
})


//渲染搜索页面
router.get('/search.html', function(req,res) {
    let page = req.query.page || 1; // 页码
    let pageSize = req.query.pageSize || 5; // 每页显示的条数
    let nickname = req.query.nickname
    console.log(typeof nickname)
    usersModel.search({
      page: page,
      pageSize: pageSize,
      nickname:nickname
    }, function(err, data) {
      if (err) {
        res.render('yjkerror', err);
      } else {
        res.render('search', {
          username: req.cookies.username,
          nickname: req.cookies.nickname,
          isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',
          userList: data.userList,
         
          totalPage: data.totalPage,
          page: data.page
         
        });
      }
    // res.render('search')
    });


//搜索功能



  
})
module.exports = router;
