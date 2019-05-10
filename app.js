var http = require("http");
var mysql = require('mysql');
var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var urllib = require('url');



app.use(express.static("houtai"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// 数据库链接
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'tiaotiao',
    database: 'gongjiao',
    connectionLimit:200,
    waitForConnections:true
    //,useConnectionPooling: true
});




// 数据库操作
app.post('/_user', function (req, res) {
    console.log(req.body);
    var sql = "SELECT * FROM user where username='" + req.body.user + "'"
        + " and password='" + req.body.pad + "'";
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            console.log("RESSULT::" + result);
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                //   if( result == []){
                //     res.send(500);
                //   }else{
                //     res.status(200).send((result).toString());
                //   }

            }
            res.send(result);
            connection.release();
        });
    })


})
//  公司查询
app.get('/duqugongsi', function (req, res) {
    var sql = "SELECT * FROM company;"
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            console.log('我是二');
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
            res.send(result);
            connection.release();
        });
    })


})
// 广告查询
app.get('/_guanggao', function (req, res) {
    var sql = "SELECT * FROM guanggao;"
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                // console.log("==="+result);
                // console.log(result.imge.toString);
                //let resu2= buf.toString(result[1].imge)
                // let bitmap1 = String.fromCharCode(result[0].imge);//解码图片
                // let bitmap2 = String.fromCharCode(result[1].imge);//解码图片

                //     var buffer = new Buffer( result[0].imge , 'binary');
                //     var bitmap1 = buffer.toString('base64');
                //    var  buffer2 = new Buffer( result[1].imge , 'binary');
                //     var bitmap2 = buffer2.toString('base64');

                //console.log("11"+aa);
                //let gg = [bitmap1,bitmap2];
                res.send(result);
                connection.release();
            }

        });
    })



})
// 报修项目查询
app.get('/duqugongbx', function (req, res) {
    var sql = "SELECT * FROM bus;"
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
            res.send(result);
            connection.release();
        });
    })



})
//  公司删除
app.get('/_dele', function (req, res) {
    console.log(req.body);
    var sql = "DELETE FROM company WHERE id=" + req.query.id;
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
            res.send(result);
            connection.release();
        });
    })



})
// 报修项目删除
app.get('/_dele_', function (req, res) {
    console.log(req.body);
    var sql = "DELETE FROM bus WHERE id=" + req.query.id;
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
            res.send(result);
            connection.release();
        });
    })



})
//  公司添加
app.post('/gs_xinzeng', function (req, res) {
    if (req.body.id == '' || req.body.id == null) {
        var sql = "insert into company (bus_name,bus_title,bus_desc,bus_logo,bus_ywu,lo) values ('" + req.body.name + "','" + req.body.title + "','" + req.body.desc + "','" + req.body.logo + "','" + req.body.yewu + "','" + req.body.lo + "')";
        console.log("SQL::" + sql);
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {

                if (err) {
                    console.log(`SQL error: ${err}!`);
                } else {
                    console.log(result);
                    // closeMysql(connect);
                }
                res.send(result);
                connection.release();
            })
        })


    } else {
        console.log(req.body.id + 'id');
        //var sql = "UPDATE company SET bus_name="+req.query.name+"','bus_title="+req.query.title+"','bus_desc="+req.query.desc+" WHERE id="+req.query.id;
        var sql = "UPDATE company SET bus_name='" + req.body.name + "',bus_title='" + req.body.title + "',bus_desc='" + req.body.desc + "',bus_logo='" + req.body.logo + "',bus_ywu='" + req.body.yewu + "',lo='" + req.body.lo + "' WHERE id=" + req.body.id;
        // var sql = "insert into company (id,imge) values ('" + req.query.id + "','" + req.query.img + "')";

        console.log("SQL::" + sql);
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(`SQL error: ${err}!`);
                    //connection.release();
                } else {
                    console.log(result);
                    // closeMysql(connect);
                }
                res.send(result);
                connection.release();
            })
        })


    }
});
// 广告添加
app.post('/gg_xinzeng', function (req, res) {

    console.log("====::" + req.body.value);
    //var sql = "UPDATE company SET bus_name="+req.query.name+"','bus_title="+req.query.title+"','bus_desc="+req.query.desc+" WHERE id="+req.query.id;
    var sql = "update guanggao set imge='" + req.body.img + "' WHERE id=" + req.body.id;
    // var sql1 = "insert into guanggao (id,imge) values ('" + req.body.id + "','" + req.body.img + "')";

    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
            res.send(result);
            connection.release();
        })
    })



});
// 广告图片删除

app.get('/gg_shanchu', function (req, res) {
    var sql = "update guanggao set imge='' WHERE id=" + req.query.id;
    console.log("SQL::" + sql);
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
            res.send(result);
            connection.release();
        });
    })



})
// 维修添加
app.get('/bx_xinzeng', function (req, res) {
    if (req.query.id == '' || req.query.id == null) {
        var sql = "insert into bus (name,price,detail) values ('" + req.query.name + "','" + req.query.title + "','" + req.query.bus_desc + "')";
        console.log("SQL::" + sql);
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(`SQL error: ${err}!`);
                } else {
                    console.log(result);
                    // closeMysql(connect);
                }
                res.send(result);
                connection.release();
            })
        })


    } else {
        console.log(req.query.id + 'id');
        //var sql = "UPDATE company SET bus_name="+req.query.name+"','bus_title="+req.query.title+"','bus_desc="+req.query.desc+" WHERE id="+req.query.id;
        var sql = "UPDATE bus SET name='" + req.query.name + "',price='" + req.query.title + "',detail='" + req.query.bus_desc + "' WHERE id=" + req.query.id;

        console.log("SQL::" + sql);
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log(`SQL error: ${err}!`);
                } else {
                    console.log(result);
                    // closeMysql(connect);
                }

                res.send(result);
                connection.release();
            })
        })


    }
});



// ==
app.get('/', function (req, res) {
    console.log("收到请求");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,x-requested-with,Authorization, x-ui-request,lang");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");

    response.end('./houtai/index.html');

    // connection.release();
})
// ==
app.get('/jso', function (req, res) {
    var params = urllib.parse(req.url, true);
    var data = {};
    // 
    var sql = "SELECT * FROM company;"
    var s = "SELECT * FROM bus;"
    var sq = "SELECT * FROM guanggao;"
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            console.log("公司" + result);
            data.bx = result;

            connection.query(s, function (err, result1) {
                data.gs = result1;
                console.log("维修" + result1);

                connection.query(sq, function (err, result2) {
                    data.ggao = result2;
                    console.log("广告" + result2);

                    if (params.query && params.query.callback) {
                        var str = params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
                        res.end(str);
                    } else {
                        res.end(JSON.stringify(data));//普通的json
                    }
                });
            });
        });

        connection.release();
    });

});
// ---
app.use(express.static("houtai")).listen(8888);


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');