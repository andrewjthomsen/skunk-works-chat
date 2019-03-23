module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
  });

  User.associate = function (models) {
    models.User.hasMany(models.Chat);
  };

  User.associate = function (models) {
    models.User.hasOne(models.userInfo);
  };

  return User;
};
