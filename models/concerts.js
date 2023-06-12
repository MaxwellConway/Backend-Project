"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Concerts extends Model {
    static associate(models) {
      Concerts.hasMany(models.linkedUserConcerts, { foreignKey: "concertId" });
    }
  }
  Concerts.init(
    {
      concertCode: DataTypes.STRING,
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Concerts",
    }
  );
  return Concerts;
};
