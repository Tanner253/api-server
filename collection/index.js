'use strict';

const {Sequelize, DataTypes} = require('sequelize');

const peopleSchema = require('./people.schema.js');
const musicSchema = require('./music.schema.js');
const ICollection = require('./lib/ICollection.js')

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL || 'postgresql://localhost:5432/api-app'
console.log(DATABASE_URL, process.env.NODE_ENV)


//disable if need to seed locally!
const sequelize = new Sequelize(DATABASE_URL, {
  // dialectOptions:{
  //   ssl:{
  //     require:true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

const PeopleModel = peopleSchema(sequelize, DataTypes);
const MusicModel = musicSchema(sequelize, DataTypes);

PeopleModel.hasMany(MusicModel, { foreignKey: 'songId', sourceKey: 'id'})
MusicModel.belongsTo(PeopleModel, { foreignKey: 'songId', targetKey: 'id'})

module.exports = {
  sequelize,
  peopleCollection: new ICollection(PeopleModel),
  musicCollection: new ICollection(MusicModel)
}