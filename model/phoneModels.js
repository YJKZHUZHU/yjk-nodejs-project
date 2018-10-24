const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const async = require('async');
const phoneModel = {
    addphone(data,cb) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('链接数据库失败', err);
                cb({ code: -100, msg: '链接数据库失败'});
                return;
            } 
            const db = client.db('yjk')
            let saveDate = {
               phonephoto: data.phonephoto,
               phonenickname: data.phonenickname,
               phonebrand: data.phonebrand,
               officialprice:data.officialprice,
               usedprice:data.usedprice
            }
            async.series([
                function (callback) {
                  // 查询是否已将添加过
                  db.collection('phone').find({phonenickname: saveDate.phonenickname}).count(function(err, num) {
                    if (err) {
                      callback({ code: -101, msg: '查询是否已添加失败' });
                    } else if (num !== 0) {
                      console.log('用户已经注册过了');
                      callback({ code: -102, msg: '手机已经添加过了'});
                    } else {
                      console.log('当前手机可以添加');
                      callback(null);
                    }
                  })
                },
        
                function (callback) {
                  // 查询表的所有记录条数
                  db.collection('phone').find().sort({_id:-1}).toArray(function(err,results) {
                    if (err) {
                      callback({code:-101,msg:'查询所有记录失败'})
                    }else {
                      if (results.length === 0) {
                        saveDate._id = 1
                      }else {
                        var num = results[0]._id
                        // var num = 2;
                        saveDate._id = num + 1
                      }
                      callback(null)
                    }
                  })
                },
        
                function (callback) {
                  // 写入数据库的操作
                  db.collection('phone').insertOne(saveDate, function(err) {
                    if (err) {
                      callback({ code: -101, msg: '写入数据库失败'});
                    } else {
                      callback(null);
                    }
                  })
                }
              ], function(err, results){
                // 不管上面3个异步操作是否都成功，都会进入到这个最终的回调里面
                if (err) {
                  console.log('上面的3步操作，可能出了问题', err);
                  // 还得告诉前端页面
                  cb(err);
                } else {
                  cb(null);
                }
                client.close();
              });
        
        })
    },
    getphoneList(data,cb) {
      MongoClient.connect(url,function(err, client) {
        if (err) {
          cb({code: -100,msg: '数据库连接失败'})
        } else {
          var db = client.db('yjk')
          var limitNum = parseInt(data.pageSize);
          var skipNum = data.page * data.pageSize - data.pageSize;
          
        async.parallel([
          function (callback) {
            // 查询所有记录
            db.collection('phone').find().count(function(err, num) {
              if (err) {
                callback({code: -101, msg: '查询数据库失败'});
              } else {
                callback(null, num);
              }
            })
          },

          function (callback) {
            // 查询分页的数据
            db.collection('phone').find().limit(limitNum).skip(skipNum).toArray(function(err, data) {
              if (err) {
                callback({code: -101, msg: '查询数据库失败'});
              } else {
                callback(null, data);
              }
            })
          }
        ], function(err, results) {
          if (err) {
            cb(err);
          } else {
            cb(null, {
              totalPage: Math.ceil(results[0] / data.pageSize),
              userList: results[1],
              page: data.page,
            })
          }
          // 关闭连接
          client.close();
        })
        }
      })
    },
    deletephone(data, cb) {
      MongoClient.connect(url, function(err,client) {
        if (err) {
          cb({code: -100,msg:'数据库连接失败'})
        } else {
          const db = client.db('yjk')
          db.collection('phone').deleteOne({
            _id:data
          })
          client.close()
        }
      })
    },
    modefier(data, cb) {
      MongoClient.connect(url, function(err, client) {
        if (err) {
          cb({code:-100,msg:'数据库连接失败'})
        } else {
          const db = client.db('yjk')
          db.collection('phone').updateOne({_id:data.tid},{$set: {
            officialprice:data.officialprice,
            usedprice:data.usedprice
          }},function(err,data){
            if (err) {
              cb({code: -100,msg:'数据库连接失败'})
            } else {
              cb(null)
            }
          })
          client.close()
        }
      })
    }
}


module.exports = phoneModel;