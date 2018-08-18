const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Mountains = require('../models/mountain');
const authenticate = require('../authenticate');

const MountainRouter = express.Router();

MountainRouter.use(bodyParser.json());


MountainRouter.route('/')
.get((req,res,next) => {
    Mountains.find({})
    .then((mountains) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mountains);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin, (req, res, next) => {
    Mountains.create(req.body)
    .then((mountain) => {
        console.log('Mountain Created ', mountain);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mountain);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /mountains');
})
.delete(authenticate.verifyAdmin, (req, res, next) => {
    Mountains.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

MountainRouter.route('/:mountainId')
.get((req,res,next) => {
    Mountains.findById(req.params.mountainId)
    .then((mountain) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mountain);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /mountains/'+ req.params.mountainId);
})
.put(authenticate.verifyAdmin, (req, res, next) => {
    Mountains.findByIdAndUpdate(req.params.mountainId, {
        $set: req.body
    }, { new: true })
    .then((mountain) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(mountain);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyAdmin, (req, res, next) => {
    Mountains.findByIdAndRemove(req.params.mountainId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports =  MountainRouter;
