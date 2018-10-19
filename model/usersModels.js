// 模块，是用来操作users相关的后台数据库处理的代码
// 注册操作
// 登录操作
// 修改操作
// 删除操作
// 查询列表操作

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

const usersModel = {
  /**
   * 注册操作
   * @param {Object} data 注册信息
   * @param {Function} cb 回调函数
   */
  add (data, cb) {
    MongoClient.connect(url, function(err, client) {
      if (err) throw err;
      const db = client.db('yjk');

      // 1. 对 data 里面的 isAdmin 修改为 is_admin
      // 2. 写一个 _id 为 1
      // 思考，下一个注册，先得到之前的用户表的记录条数，+1 操作之后写给下一个注册的人。
      // 思考, 不允许用户名相同。

      let saveData = {
        username: data.username,
        password: data.password,
        nickname: data.nickname,
        phone: data.phone,
        is_admin: data.isAdmin
      };



      console.log(saveData);

      db.collection('users').find({username: saveData.username}).count(function(err, num) {
        // 如果 num 为 0 ，没有注册，否则已经注册了
        if (err) throw err;
        if (num === 0) {
          db.collection('users').find().count(function(err, num1) {
            if (err) throw err;
            saveData._id = num1 + 1;

            console.log(saveData);

            db.collection('users').insertOne(saveData, function(err) {
              if (err) throw err;
              cb(null);
                console.log(333)
              client.close();
            })


          });
        } else {
          cb('已经注册过了');
          client.close();
        }
      })
    })
  }
}
module.exports = usersModel;


