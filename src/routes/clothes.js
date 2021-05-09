'use strict';

const express = require('express');
const router = express.Router();

const Clothes = require('../models/data-collection-class');

const clothesitem = require('../models/clothes');

const clothesInstance = new Clothes(clothesitem); 

router.get('/clothes', getClothes);
router.get('/clothes/:id', getOneClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', updateClothes);
router.delete('/clothes/:id', deleteClothes);


async function getClothes(req, res) {
    let items = await clothesInstance.get();
    res.status(200).json(items);
}

async function getOneClothes(req, res) {
    let id = req.params.id; 
    let oneItem = await clothesInstance.get(id);
    res.status(200).json(oneItem);
}

async function createClothes(req, res) {
    let obj = req.body;
    let newItem = await clothesInstance.create(obj);
    res.status(201).json(newItem);
}

async function updateClothes(req, res) {
    let id = req.params.id;
    const obj = req.body;
    let updatedClothes = await clothesInstance.update(id, obj);
    res.status(200).json(updatedClothes);
}

async function deleteClothes(req, res) {
    let id = req.params.id;
    let deleted = await clothesInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;