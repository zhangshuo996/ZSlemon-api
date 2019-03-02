var moment = require("moment")
var Mongo = require("mongodb-curd");
var batabaseName = "lemon"

//初始获取菜单内该用户的信息
function getbill(req, res, next) {
    Mongo.find(batabaseName, "bills", {uID: req.query.uID}, function (result) {
        if (!result) {
            res.send({
                code: 0,
                mes:"error"
            })
        }else{
            res.send({
                code: 1,
                mes: "success",
                data:result
            })
        }
    })
}
//添加账单     
function addbill(req, res, next) {
    if (!req.body.uID || !req.body.time || !req.body.money || !req.body.cName ||!req.body.type) {
        res.send({
            code: 0,
            msg:"参数丢失"
        })
    } else {
        Mongo.insert(batabaseName,"bill",res.body,function(result){
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
}

//按照什么方式去获取用户的记账单
function findbills(req, res, next) {
    var data = req.body
    var reg = data.time && new RegExp("^" + data.time)

    if (!data.uID || !data.time) {
        res.send({
            code: 0,
            mes: "参数不全",
        })
        return
    }
    if (data.cName) {
        data = {
            "uID":data.uID,
            "time": reg,
            "cName":{"$in":data.cName.split(",")}
        }
    } else {
        data = {
            "uID":data.uID,
            "time":reg
        }
    }
    
    Mongo.find(batabaseName, "bills",data, function (result) {
        if (!result) {
            res.send({
                code: 0,
                mes:"error"
            })
        }else{
            res.send({
                code: 1,
                mes: "success",
                data:result
            })
        }
    })
    
}
//删除账单接口
function removebill(req, res, next) {
    var data = req.body
    if (!data.id) {
        res.send({
            code: 0,
            msg:"参数丢失"
        })
        return
    }
    Mongo.remove(batabaseName,collcationName,{_id:data.id},function(result){
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
    getbill: getbill,
    addbill: addbill,
    findbills: findbills,
    removebill:removebill
}