const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Cultures = require('../models/culture');

const CultureRouter = express.Router();

CultureRouter.use(bodyParser.json());


CultureRouter.route('/')
.get((req,res,next) => {
    Cultures.find({})
    .then((cultures) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cultures);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Cultures.create(req.body)
    .then((culture) => {
        console.log('Culture Created ', culture);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(culture);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /cultures');
})
.delete((req, res, next) => {
    Cultures.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

CultureRouter.route('/:cultureId')
.get((req,res,next) => {
    Cultures.findById(req.params.cultureId)
    .then((culture) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(culture);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /cultures/'+ req.params.cultureId);
})
.put((req, res, next) => {
    Cultures.findByIdAndUpdate(req.params.cultureId, {
        $set: req.body
    }, { new: true })
    .then((culture) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(culture);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Cultures.findByIdAndRemove(req.params.cultureId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports =  CultureRouter;
