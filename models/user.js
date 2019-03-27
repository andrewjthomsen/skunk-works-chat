module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT,
    imagePath: DataTypes.STRING
  });

  User.associate = function (models) {
    models.User.hasMany(models.Chat);
  };

  return User;
};
