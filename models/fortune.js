module.exports = (sequelize, DataTypes) => {
  const Fortune = sequelize.define('fortune', {
    fortune: {
      type: DataTypes.STRING,
      allowNull: false
    },
    luckNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Fortune;
};
