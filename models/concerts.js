"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Concerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Concerts.hasMany(models.linkedUserConcerts, { foreignKey: "concertId" });

      // define association here
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
