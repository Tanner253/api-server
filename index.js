'use strict';
const { sequelize } = require('./collection');
const { start } = require('./server/server.js');
const PORT = process.env.PORT || 3000;
sequelize.sync()
.then( () => {
  console.log('database is synced and ready to go');
  // peopleModel.create({name: 'tom'});
  // musicModel.create({songName: 'brap brap boop'});
  start(PORT);
})
.catch(err => {
  console.error(err);
})

