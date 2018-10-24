var express = require('express');
var router = express.Router();
const usersModel = require('../model/usersModels');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册页面
// router.get('/register', function(req, res) {
//   res.render('register');
// });

// 注册处理
router.post('/register', function (req, res) {
  if (!/^\S{3,10}$/.test(req.body.username)) {
    res.render('yjkerror', { code: -1, msg: '用户名必须是5-10位' });
    return;
  }
  usersModel.add(req.body, function(err) {
    if (err) {
      // 如果有错误，直接将错误信息渲染到页面
      res.render('yjkerror', err);
    } else {
      res.redirect('/login.html');
    }
  })

});

// 登录处理
router.post('/login', function(req, res) {
  // 调用 userModel里面的 login方法
  usersModel.login(req.body, function(err, data) {
    if (err) {
      res.render('yjkerror', err);
    } else {
      // 跳到到首页
      console.log('当前登录用户的信息是', data);

      // 写 cookie
      res.cookie('username', data.username, {
        maxAge: 1000 * 60 * 1000000, // 单位是毫秒，
      })

      res.cookie('nickname', data.nickname, {
        maxAge: 1000 * 60 * 1000000, // 单位是毫秒，
      })

      res.cookie('isAdmin', data.isAdmin, {
        maxAge: 1000 * 60 * 1000000, // 单位是毫秒，
      })

      res.redirect('/');
    }
  })
})

// 退出登录
router.get('/logout', function(req, res) {
  // 清除cookie
  // 跳转 登录页
  if(!req.cookies.username) {
    res.redirect('/login.html')
  }
  res.clearCookie('username');
  res.clearCookie('nickname');
  res.clearCookie('isAdmin');
  res.send('<script>location.replace("/")</script>')
})


//修改用户
router.post('/updateuser', function(req, res) {
  var id = JSON.parse(req.body.uid)//转成numberleix
  req.body.uid = id
  console.log(req.body)
  usersModel.update({
    id:req.body.uid,
    newNickName: req.body.nickname,
    phonenumber:req.body.phonenumber,
    sex: req.body.sex,
    age:req.body.age
},function(err){
  if (err) {
    res.send('yjkerror',err)
  }else {
    res.redirect('/user-manager.html')
  }
})
})
//跳页面更新
router.post('/modefication', function(req, res) {
  console.log(req.body)
  var id = JSON.parse(req.body.id)//转成numberleix
  req.body.id = id
  usersModel.updatetwo({
    id:req.body.id,
    nickname:req.body.newNickName,
    phonenumner:req.body.newPhoneNumber
  },function(err) {
    if (err) {
      res.redirect('yjkerror',err)
    }else {
      res.redirect('/user-manager.html')
    }
    res.redirect('/user-manager.html')

  })
  

})
module.exports = router;
