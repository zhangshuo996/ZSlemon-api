var moment = require("moment")
var Mongo = require("mongodb-curd");
var batabaseName = "lemon",
    collcationName = "custom";

//添加自定义类型从custom获取到数据
function getCustom(req,res,next) { 
    Mongo.find(batabaseName,collcationName,{},function(result){
        if(!result){
           res.send({
               code:0,
               mes:"error"
            })
        }else{
            res.send({
               code:1,
               mes:"success",
               data:result
            })
        }
    })
}


//添加自定义类型添加到class分类集合内
function addCustom(req,res,next) {
    if (!req.body.cName || !req.body.uID || !req.body.type || !req.body.icon) {
        res.send({
            code: 0,
            mes:"参数不全"
        })
    } else {
        isHasCustom(req,res,next)
    }
}
function isHasCustom(req,res,next) {
    Mongo.find(batabaseName, "classify", { 
        "cName": req.body.cName,
        "uID": { "$in": ["all", req.body.uID] },
        "type":req.body.type
    }, function (result) {
        if(result.length){
            res.send({
                code:0,
                mes:"类型已存在"
            })
        } else {
           addCustoms(req,res,next)
        }
    })
}
function addCustoms(req,res,next) {
    Mongo.insert(batabaseName,"classify",req.body,function(result){
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
//查找当前用户所添加过的类还有默认类
function findClassify(req,res,next) {
    Mongo.find(batabaseName,"classify",{
        "uID": { "$in": ["all", req.body.uID] },
        "type":req.body.type
    },function(result){
        if(!result){
           res.send({
               code:0,
               mes:"error"
            })
        }else{
            res.send({
               code:1,
               mes:"success",
               data:result
            })
        }
    })
}

module.exports = {
    getCustom: getCustom,
    addCustom: addCustom,
    findClassify:findClassify
}