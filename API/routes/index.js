var express = require('express');
var router = express.Router();
var moment = require("moment")
var Mongo = require("mongodb-curd");
var batabaseName = "user",
collcationName = "mycoll"
/* GET home page. */
// router.get('/', function (req, res, next) {
//   var limit = req.query.limit || 0;
//   var skip = req.query.skip || 0;
//   Mongo.find(batabaseName,collcationName,{},function(result){
//     if(!result){
//       res.send({
//           code:0,
//           mes:"error"
//         })
//     } else {
//       var len = Math.floor(result.length/limit)
//       Mongo.find(batabaseName,collcationName,{},function(rs){
//         if(!rs){
//           res.send({
//               code:0,
//               mes:"error"
//             })
//         } else {
//             res.send({
//               code:1,
//               mes:"success",
//               data: rs,
//               lens:len
//             })
//         }
//       }, {
//           skip: skip * limit,
//           limit: limit,
//           sort:{"cTime":-1}
//       })
//     }
//   })
// });
// /* 查询数据库. */
// router.get('/app/list', function (req, res, next) {
//   md.connect({
//     query: { _id: req.query.id },
//     type:"deleteOne",
//     ck: function (data) {
//       if (data.result.n) {
//         res.send({code:1,msg:"删除成功"})
//       } else {
//         res.send({code:1,msg:"删除失败"})
//       }
//     }
//   })
// });
// //添加
// router.post('/add', function (req, res, next) {
//   var parems = req.body,
//       paremsName = parems.name,
//       paremsAge = parems.age,
//       paremsCurd = parems.iCurd,
//       paremsClass = parems.classroom,
//       paremsTime = moment().format('YYYY-MM-DD HH:mm:ss');
//   Mongo.find(batabaseName, collcationName, { iCurd: paremsCurd }, function (result) {
//     if (!result.length) {
//       Mongo.insert(batabaseName, collcationName, {
//         name: paremsName,
//         age:paremsAge,
//         iCurd: paremsCurd,
//         classroom:paremsClass,
//         cTime:paremsTime
//       }, function (rs) {
//           if(!rs){
//             res.send({
//                 code:0,
//                 mes:"error"
//               })
//           }else{
//               res.send({
//                 code:2,
//                 mes:"添加成功",
//                 data:rs
//               })
//           }
//       })
//     }else{
//         res.send({
//           code:1,
//           mes:"存在",
//         })
//     }
//   })
// });
// //删除
// router.post("/remove", function (req, res, next) {
//   var parems = req.body,
//     id = parems.id
//     Mongo.remove(batabaseName,collcationName,{_id:id},function(result){
//       if(!result){
//          res.send({
//              code:0,
//              mes:"删除失败"
//           })
//       }else{
//           res.send({
//              code:1,
//              mes:"删除成功",
//              data:result
//           })
//       }
//   })
// })

// //详情页面

// router.post("/details", function (req, res, next) {
//   var reg = new RegExp("^" + req.body.val)
//   console.log(typeof req.body.val)
//   var key = typeof req.body.val == "string"? { "name": { $regex: reg } } : { _id: req.body.id };
//   console.log(key)
//   var limit = req.body.limit || 0;
//   var skip = req.body.skip || 0;
//   Mongo.find(batabaseName,collcationName,key,function(result){
//     if(!result){
//       res.send({
//           code:0,
//           mes:"error"
//         })
//     } else {
      
//         res.send({
//           code:1,
//           mes:"success",
//           data:result
//         })
//     }
//   }, {
//       skip: skip * limit,
//       limit: limit,
//       sort:{"cTime":-1}
//   })
//     Mongo.find(batabaseName,collcationName,key,function(result){
//       if(!result){
//         res.send({
//             code:0,
//             mes:"error"
//           })
//       } else {
        
//           res.send({
//             code:1,
//             mes:"success",
//             data:result
//           })
//       }
//     }, {
//         skip: skip * limit,
//         limit: limit,
//         sort:{"cTime":-1}
//     })
// })

// router.post("/update", function (req, res, next) {
//   var parems = req.body,
//     id = parems.id,
//     paremsName = parems.name,
//     paremsAge = parems.age,
//     paremsCurd = parems.iCurd,
//     paremsClass = parems.classroom,
//     paremsTime = moment().format('YYYY-MM-DD HH:mm:ss');
  
//   Mongo.update(batabaseName, collcationName, [{ _id: id }, {
//       name: paremsName,
//       age:paremsAge,
//       iCurd: paremsCurd,
//       classroom:paremsClass,
//       iTime:paremsTime
//     }],function(result){
//         if(!result){
//           res.send({
//               code:0,
//               mes:"修改失败"
//             })
//         }else{
//             res.send({
//               code:1,
//               mes:"修改成功",
//               data:result
//             })
//         }
//     })
// })
module.exports = router;
