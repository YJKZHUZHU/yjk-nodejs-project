var fs = require('fs')

var dbPath = './publish.json'

/**
 * 获取学生列表
 * @param  {Function} callback 回调函数
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

/**
 * 添加保存学生
 * @param  {Object}   student  学生对象
 * @param  {Function} callback 回调函数
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //时间
        var w_array = new Array("星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

        var d = new Date();

        var year = d.getFullYear();

        var month = d.getMonth() + 1;

        var day = d.getDate();

        var week = d.getDay();

        var h = d.getHours();

        var mins = d.getMinutes();

        var s = d.getSeconds();



        if (month < 10) month = "0" + month

        if (day < 10) month = "0" + day

        if (h < 10) h = "0" + h

        if (mins < 10) mins = "0" + mins

        if (s < 10) s = "0" + s



        var shows = year + "-" + month + "-" + day + " " + h + ":" + mins + ":" + s + " " + w_array[week];








        // 添加 id ，唯一不重复
        student.id = students[students.length - 1].id + 1
        student.dateTime = shows

        // 把用户传递的对象保存到数组中
        students.unshift(student)

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // 注意：这里记得把 id 统一转换为数字类型
        student.id = parseInt(student.id)

        // 你要修改谁，就需要把谁找出来
        // EcmaScript 6 中的一个数组方法：find
        // 需要接收一个函数作为参数
        // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
        var stu = students.find(function (item) {
            return item.id === student.id
        })

        // 这种方式你就写死了，有 100 个难道就写 100 次吗？
        // stu.name = student.name
        // stu.age = student.age

        // 遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}

/**
 * 删除学生
 */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        // findIndex 方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })

        // 根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}