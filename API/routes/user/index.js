var express = require('express');
var router = express.Router();
var moment = require("moment")
var Mongo = require("mongodb-curd");
var batabaseName = "lemon",
collcationName = "users"


function findUser(req, res, next) {
    Mongo.find(batabaseName,collcationName,{},function(result){
        if(!result){
          res.send({
              code:0,
              mes:"error"
            })
        } else {
            res.send({
                code:1,
                mes:"success",
                data: result
            })
        }
      })
}

function addUser(req, res, next) {
    if (!req.body.name || !req.body.pwd || !req.body.e - mail) {
        res.send({
            code:0,
            mes:"请添加完整"
        })
    } else {
        isHasusers(req,res,next)
    }
    

}

function isHasusers(req,res,next) {
    Mongo.find(batabaseName, collcationName, { "name": req.body.name }, function (result) {
        console.log(result)
        if(result.length){
            res.send({
                code:0,
                mes:"已有用户名"
            })
        }else{
           addUsers(req,res,next)
        }
    })
}
function addUsers(req,res,next) {
    Mongo.insert(batabaseName,collcationName,req.body,function(result){
        if(!result){
           res.send({
               code:0,
               mes:"error",
            })
        }else{
            res.send({
               code:1,
               mes:"添加成功",
               data:result
            })
        }
    })
}

module.exports = {
    addUser:addUser,
    findUser:findUser,
}