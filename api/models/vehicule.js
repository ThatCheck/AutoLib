/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicule', {
    idVehicule: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    RFID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    etatBatterie: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Disponibilite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    type_vehicule: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'type_vehicule',
        key: 'idType_vehicule'
      }
    }
  }, {
    tableName: 'vehicule',
    freezeTableName: true
  });
};
