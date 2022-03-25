'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('music', {
    songName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Artist:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
}