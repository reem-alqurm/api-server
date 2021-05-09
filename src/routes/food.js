'use strict';

const express = require('express');
const router = express.Router();

const Food = require('../models/data-collection-class');
const fooditem = require('../models/food');

const foodInstance = new Food(fooditem); 

router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);


async function getFood(req, res) {
    let items = await foodInstance.get();
    res.status(200).json(items);
}

async function getOneFood(req, res) {
    let id = req.params.id; 
    let oneItem = await foodInstance.get(id);
    res.status(200).json(oneItem);
}

async function createFood(req, res) {
    let obj = req.body;
    let newItem = await foodInstance.create(obj);
    res.status(201).json(newItem);
}

async function updateFood(req, res) {
    let id = req.params.id;
    const obj = req.body;
    let updatedFood = await foodInstance.update(id, obj);
    res.status(200).json(updatedFood);
}

async function deleteFood(req, res) {
    let id = req.params.id;
    let deleted = await foodInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;