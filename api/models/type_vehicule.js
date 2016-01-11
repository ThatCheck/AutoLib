/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type_vehicule', {
    idType_vehicule: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type_vehicule: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'type_vehicule',
    freezeTableName: true
  });
};
