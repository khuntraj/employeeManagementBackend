const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Data = require('../module/employee')


//get data
router.get("/", (req, res, next) => {
    Data.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entries found',
                    employee: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/employee' +docs._id
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    Data.findById(id)
        .select('name email phone course _id')
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json({
                    employee: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/employee'
                    }
                });
            } else {
                res.status(404).json({ 
                    message: "no valid entry" 
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
});

//post data
router.post('/', (req, res, next) => {
    const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        course: req.body.course
    });
    data
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: ' POST -work',
                createdData: {
                    name: result.name,
                    email: result.email,
                    phone: result.phone,
                    course: result.course,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/employee/' + result._id
                    }
                }
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
});

//update data
router.patch("/:employeeId", (req, res, next) => {
    const id = req.params.employeeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Data.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//delete data
router.delete("/:employeeId", (req, res, next) => {
    const id = req.params.employeeId;
    Data.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "delete",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/products",
                    body: {
                        name: "String",
                        price: "Number"
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

})
module.exports = router;
