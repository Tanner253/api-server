'use strict';

const ICollection = require('../collection/lib/ICollection.js');
const { sequelize, PeopleModel, MusicModel } = require('../collection');


beforeAll(async () =>{
  await sequelize.sync();
})

afterAll(async () =>{
  await sequelize.drop();
})

describe('testing collection interface', () => {
  test('should create a person', async () => {
    const peopleCollection = new ICollection(PeopleModel);
    const peopleInstance = await peopleCollection.create({name: "tom"});
    expect(peopleInstance.name).toEqual('tom');
  })

  test('should read people with music items', async () => {
    const musicCollection = new ICollection(MusicModel);
    const peopleCollection = new ICollection(PeopleModel);

    let testPerson = await peopleCollection.create({name: "tom"});
    let testMusic = await musicCollection.create({songName:"Encore", songId: testPerson.id });

    let personWithMusic = await peopleCollection.read(testPerson.id, {include: musicCollection.model});
    expect(personWithMusic.name).toEqual(testPerson.name);
    expect(personWithMusic.music).toBeTruthy();
  })
})
