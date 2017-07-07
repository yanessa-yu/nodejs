var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    db.query('SELECT * FROM `userinfo`;', function (err, rows) {
        if (err) {
          console.log(123)
            res.render('users', {title: 'Express', datas: []});  // this renders "views/users.html"
        } else {
            console.log(rows)

            res.render('users', {title: 'Express', datas: rows});
        }
    })
});

/**新增数据**/
router.get('/add',function (req,res) {
    res.render('add');
})
router.post('/add',function (req,res) {
    var name = req.body.name;
    var age = req.body.age;
    db.query("insert into userinfo(name,age) values('" + name + "'," + age + ")", function (err, rows) {
        if(err){
            res.end('新增失败：' + err);
        }else{
            res.redirect('/users');
        }
    })
})
/***删除数据*/
router.get('/del/:id',function (req,res) {
    var id = req.params.id;
    db.query("delete from userinfo where id=" + id, function (err, rows) {
        if(err){
            res.end('删除失败:' + err)
        }else{
            res.redirect('/users');
        }
    })
})

/**
 * 修改数据
 **/
router.get('/toUpdate/:id',function (req,res) {
    var id = req.params.id;
    db.query("select * from userinfo where id= " + id, function (err, rows) {
        if (err){
            res.end('修改页面跳转失败：' + err)
        }else{
            res.render('update',{datas: rows})
        }
    });
});

router.post('/update',function (req,res) {
    var id = req.body.id;
    console.log(id)
    var name = req.body.name;
    var age =  req.body.age;
    db.query("update userinfo set name='" + name + "',age='" + age + "' where id=" + id,function (err,rows) {
        if (err) {
            res.end('修改失败：' + err)
        }else{
            res.redirect('/users')
        }
    })
})
module.exports = router;
