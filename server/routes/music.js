"use strict";

const express = require("express");

const { musicCollection } = require("../../collection");

const router = express.Router();


//get all
router.get('/music', async (req, res, next) => {
  let allRecords = await musicCollection.read();
  res.status(200).send(allRecords);
})

//get one record
router.get('/music/:id', async (req, res, next) => {
  let paramsId = req.params.id;
  //find the correct method for this pls thx
  let musicRecords = await musicCollection.read(paramsId);
  res.status(200).send(musicRecords);
})

//create
router.post('/music', async (req, res, next) => {
  let newSong = req.body;
  let response = await musicCollection.create(newSong);
  res.status(200).send(response);
})

//update
router.put('/music/:id', async (req, res, next) => {
  let musicId = parseInt(req.params.id);
  let updatedMusicObj = req.body;
  let updatedMusic = await musicCollection.update(musicId, updatedMusicObj);
  res.status(200).send(updatedMusic);
})

//delete
router.delete('/music/:id', async (req, res, next) => {
  let item = req.params.id;
  let response = await musicCollection.delete(item);
  res.status(200).json(response);
})


module.exports = router;