var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient; //mongodb的客户端对象
var ObjectID = mongodb.ObjectID;
var url = "mongodb://localhost:27017";


var mongo = {
    dbName: "user",
    colName: "mycoll",
    query: {},
    skip: 0,
    limit: 0,
    sort: {},
    type: "find",
    newVal:{},
    ck:null,
    connect: function (opt) {
        Object.assign(mongo, opt)
        console.log(mongo.query._id)
        if (mongo.query._id) {
            mongo.query._id = ObjectID(mongo.query._id)
        }
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            var db = client.db(mongo.dbName),
                cols = db.collection(mongo.colName)
                var fn = function (error, result) {
                    if (error) {
                        throw error
                    }
                    mongo.ck && mongo.ck(result)
                    client.close()
                }
            if (mongo.type == "find") {
                cols.find(mongo.query).skip(mongo.skip).limit(mongo.limit).sort(mongo.sort).toArray(fn)
            } else if (mongo.type == "update") {
                console.log(mongo.query,mongo.newVal)
                cols.update(mongo.query, {$set:mongo.newVal},fn)
            } else {
                cols[mongo.type](mongo.query, fn);
            }
        })
    }
}

module.exports=mongo