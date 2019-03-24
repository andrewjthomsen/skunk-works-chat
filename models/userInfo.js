module.exports = function (sequelize, DataTypes) {
  var userInfo = sequelize.define("userInfo", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT,
    imagePath: DataTypes.STRING
  });

  userInfo.associate = function (models) {
    models.userInfo.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return userInfo;
};