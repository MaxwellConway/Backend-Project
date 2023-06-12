"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class linkedUserConcerts extends Model {
    static associate(models) {
      linkedUserConcerts.belongsTo(models.Users, { foreignKey: "userId" });
      linkedUserConcerts.belongsTo(models.Concerts, {
        foreignKey: "concertId",
      });
    }
  }
  linkedUserConcerts.init(
    {
      concertId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "linkedUserConcerts",
    }
  );
  return linkedUserConcerts;
};
