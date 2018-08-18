const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Foods = require('../models/food');
const authenticate = require('../authenticate');

const FoodRouter = express.Router();

FoodRouter.use(bodyParser.json());


FoodRouter.route('/')
.get((req,res,next) => {
    Foods.find({})
    .then((foods) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(foods);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin, (req, res, next) => {
    Foods.create(req.body)
    .then((food) => {
        console.log('Food Created ', food);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(food);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /foods');
})
.delete(authenticate.verifyAdmin, (req, res, next) => {
    Foods.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

FoodRouter.route('/:foodId')
.get((req,res,next) => {
    Foods.findById(req.params.foodId)
    .then((food) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(food);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /foods/'+ req.params.foodId);
})
.put(authenticate.verifyAdmin, (req, res, next) => {
    Foods.findByIdAndUpdate(req.params.foodId, {
        $set: req.body
    }, { new: true })
    .then((food) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(food);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyAdmin, (req, res, next) => {
    Foods.findByIdAndRemove(req.params.foodId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports =  FoodRouter;
