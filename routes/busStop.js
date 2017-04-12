var express = require('express');
var router = express.Router();

var mongo = require('mongojs');
var db = mongo('bus',['busStop']);

/* GET home page. */
router.get('/', function(req, res, next) {
  db.busStop.find().sort({index:1}, function (err,doc) {
      if(err) res.send(err);
      res.json(doc);
  });
});

//hi
router.get('/:_id',function (req, res) {
    id = req.params._id;
    db.busStop.findOne({_id:mongo.ObjectId(id)}, function(err,doc) {
        if (err) res.send('error');
        else res.json(doc);
    })
});



router.post('/',function (req,res) {
    var index = req.body.index;
    var sname = req.body.sname;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var imgtype = req.body.imgtype;

    db.busStop.insert(
        {
            index:index,
            sname:sname,
            latitude:latitude,
            longitude:longitude,
            imgtype:imgtype,
        },
        function (err,doc) {
            if(err) res.send(err);
            res.json(doc);
        }
    )
});

router.put('/:_id',function (req,res,next) {
    var id = req.params._id;

    var index = req.body.index;
    var sname = req.body.sname;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var imgtype = req.body.imgtype;


    db.busStop.update(
        {
            _id:mongo.ObjectId(id)
        },{
            $set : {
                index:index,
                sname:sname,
                latitude:latitude,
                longitude:longitude,
                imgtype:imgtype,
            }             
        }, { upset:true },
        function (err,doc) {
            if(err) res.send(err);
            res.json(doc);
        }
    )
});

router.delete('/:_id',function (req,res) {
    id = req.params._id;

    db.busStop.remove(
        {
            _id:mongo.ObjectId(id)
        }, function (err,doc) {
            res.json(doc);
        }
    )
});


module.exports = router;
