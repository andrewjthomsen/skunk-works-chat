module.exports = function (sequelize, DataTypes) {
  var Chat = sequelize.define("Chat", {
    message: DataTypes.TEXT
  });

  // Chat.associate = function (models) {
  //   models.Chat.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Chat.associate = function (models) {
    models.Chat.belongsTo(models.userInfo, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chat;
};
