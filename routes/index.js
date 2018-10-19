var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register.html', function (req, res) {
  //res.render() 渲染页面
  res.render('register')
})
router.get('/login.html', function (req, res) {
  console.log(req.url)
  res.render('login')
})
module.exports = router;
