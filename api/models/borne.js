/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('borne', {
    idBorne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    etatBorne: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    station: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'station',
        key: 'idStation'
      }
    },
    idVehicule: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'vehicule',
        key: 'idVehicule'
      }
    }
  }, {
    tableName: 'borne',
    freezeTableName: true
  });
};
