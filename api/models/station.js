/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('station', {
    idStation: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numero: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code_postal: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'station',
    freezeTableName: true
  });
};
