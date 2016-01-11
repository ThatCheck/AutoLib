/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    idClient: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'client',
    freezeTableName: true
  });
};
