var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var url = "mongodb://localhost:27017";

function createObjectID(data) {
    if (data._id) {
        if (typeof data._id === "string") {
            data._id = ObjectID(data._id)
        }
    }
}
var mongo = {
    connect: function (baseName,bankName,callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err,con) {
            if (err) {
                throw err
            }

            var db = con.db(baseName)
            var clis = db.collection(bankName)

            callback && callback(clis,con)
        })
    },
    find: function (opt) {
        
        console.log(opt.data)
        mongo.connect(opt.basename, opt.colname, function(cols, db) {
            opt.data = opt.data ? {} : opt.data
            createObjectID(opt.data);
            var skipnum = opt.obj && opt.obj.skip ? opt.obj.skip * 1 : 0;
            var limit = opt.obj && opt.obj.limit ? opt.obj.limit * 1 : 0;
            var sort = opt.obj && opt.obj.sort ? opt.obj.sort : {};
            cols.find(opt.data).skip(skipnum).limit(limit).sort(sort).toArray(function(err, item) {
                if (err) {
                    return err;
                }
                opt.ck && opt.ck(item);
                db.close();
            })
        })
    },
    delete: function (opt) {
        opt.data = opt.data ? {} : opt.data
        opt.type = opt.type ? "one" : opt.type
        createObjectID(data)
        mongo.connect(opt.basename, opt.colname, function (cols, db) {
            if (opt.type === "one") {
                cols.deleteOne(data, function(err, result) {
                    if (err) {
                        return err;
                    }
                    opt.ck && opt.ck(result);
                    db.close();
                })
            } else if (opt.type === "many") {
                cols.deleteMany(data, function(err, result) {
                    if (err) {
                        return err;
                    }
                    opt.ck && opt.ck(result);
                    db.close();
                })
            }
            
        })
    }
}

module.exports = mongo