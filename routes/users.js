var express = require('express');
var router = express.Router();
var usersModel = require('../model/usersModels')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get('/register', function (req, res) {
//   //res.render() 渲染页面
//   res.render('register')
// })
router.post('/register', function(req, res) {
  // console.log(req.body)
  // console.log('获取传递过来的数据')
  //用户名必须是5到10位
  // console.log(req.body.username)
  if ((!/^\w{5,10}$/.test(req.body.username)) || (!/^\w{5,10}$/.test(req.body.nickname)) || (!/^[a-z0-9_-]{6,18}$/.test(req.body.password)) || (!/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/)){
    // if (!/^\w{5,10}$/.test(req.body.username)){
    // res.send('用户名不能为空')
    res.render('yjkerror')
    return
  } else if ((req.body.password != req.body.repassword) &&  req.body.password != '') {
    res.render('yjkerror')
  } else {
        usersModel.add(req.body, function (err) {
        console.log(req.body)
        if (err) {
          res.render('yjkerror')
        }else {
            //注册成功，跳到登入页面
            // res.send('hello node')
            // res.render('login')
            //不应该是渲染，而应该是跳转
            res.redirect('/login.html')
        }
        
      })
  }
  
})

module.exports = router;
