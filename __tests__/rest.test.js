'use strict';

const supertest = require('supertest');
const server = require('../server/server.js');
const request = supertest(server.app);
const { sequelize } = require('../collection');

beforeAll(async () =>{
  await sequelize.sync();
})

afterAll(async () =>{
  await sequelize.drop();
})

describe('testing rest api', () =>{
  test("error404 should return error status 404 (invalid route)", async () => {
    let response = await request.get('/routeDoesntExist')
    expect(response.status).toBe(404);
  });

  test("error404 should return error status 404 (invalid method)", async () => {
    let response = await request.put('/people')
    expect(response.status).toBe(404);
  });

  test("should CREATE a person", async () =>{
    let response = await request.post('/people').send({
      name: "jeff",
      age: 15,
      job: "debugger"
    })
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('jeff');
    expect(response.body.age).toEqual(15);
    expect(response.body.job).toEqual("debugger");
  })

  test("should READ ALL people", async () =>{
    let response = await request.get('/people')
    expect(response.status).toEqual(200);
  })

  test("should READ ONE peoples", async () =>{
    let response = await request.get('/people/1')
    expect(response.status).toEqual(200);
  })
  
  test("should UPDATE a person", async () =>{
    let response = await request.put('/people/1').send({name: "BILLY OH BOY"});
    expect(response.status).toBe(200);
  })

  test("should DELETE a person", async () =>{
    let response = await request.delete('/people/1');
    expect(response.status).toBe(200);
  })

  test("should CREATE a music obj", async () =>{
    let response = await request.post('/music').send({
      songName: "beepboop", artist: "me"
    })
    expect(response.status).toEqual(200);
    expect(response.body.songName).toEqual('beepboop');
  })

  test("should READ ALL musics", async () =>{
    let response = await request.get('/music')
    expect(response.status).toEqual(200);
  })

  test("should READ ONE music", async () =>{
    let response = await request.get('/music/1')
    expect(response.status).toEqual(200);
  })
  
  test("should UPDATE a musics", async () =>{
    let response = await request.put('/music/1').send({name: "BILLY OH BOY"});
    expect(response.status).toBe(200);
  })

  test("should DELETE a Music", async () =>{
    let response = await request.delete('/music/1');
    expect(response.status).toBe(200);
  })
})