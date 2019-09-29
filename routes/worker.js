const express = require('express');
const router = express.Router();
const worker = require('../module/workermodel');

router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
            worker.findById(req.params.id,function(err,rows){
               if(err)
               {
                   res.json(err);
                
               }
               else
               {
                   res.json(rows);

               } 
            });
    }
    else {
        worker.find({}).then(function (work) {
            console.log(work);
            res.status(200).json(work);
        });
    }
});
router.post('/', function (req, res, next) {
    console.log(req.body);
    const workerss = new worker(
        req.body
        );
    console.log("===== TEST ====\n");
    workerss.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'handle post',
            createdProduct: workerss
        });
    }).catch(err => {
        res.status(400).json({
            message: 'handle post error',
            createdProduct: workerss
        });
        console.log(err)
    });


});
router.delete('/:id',function(req,res,next){
    worker.remove({_id:req.params.id},function(err,row){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.status(200).json({delete:"successful"});
        }
    })
});
router.put('/:id',function(req,res,next){
    worker.findOneAndUpdate({_id:req.params.id},{$set:req.body},function(err,row){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(row);
        }

    });
});
module.exports = router;