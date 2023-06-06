"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class linkedUserConcerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      linkedUserConcerts.belongsTo(models.Users, { foreignKey: "userId" });
      linkedUserConcerts.belongsTo(models.Concerts, {
        foreignKey: "concertId",
      });

      // define association here
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
