'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('music', {
    songName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
}