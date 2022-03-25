"use strict";

const express = require("express");

const { peopleCollection } = require("../../collection");

const router = express.Router();



//get all
router.get('/people', async (req, res, next) => {
  let allPeopleRecords = await peopleCollection.read();
  res.status(200).send(allPeopleRecords);
})

//get one record
router.get('/people/:id', async (req, res, next) => {
  let paramsId = req.params.id;
  let personRecords = await peopleCollection.read(paramsId);
  res.status(200).send(personRecords);
})

//create
router.post('/people', async (req, res, next) => {
  let newPerson = req.body;
  let response = await peopleCollection.create(newPerson);
  res.status(200).send(response);
})

//update
router.put('/people/:id', async (req, res, next) => {
  let personId = parseInt(req.params.id);
  let updatedObj = req.body;
  let updatedPerson = await peopleCollection.update(personId, updatedObj);
  res.status(200).send(updatedPerson);
})

//delete
router.delete('/people/:id', async (req, res, next) => {
  let item = req.params.id;
  let removedPerson = await peopleCollection.delete(item);
  res.status(200).json(removedPerson);
})


module.exports = router;