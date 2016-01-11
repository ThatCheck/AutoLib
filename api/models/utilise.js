/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilise', {
    Vehicule: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'vehicule',
        key: 'idVehicule'
      }
    },
    Client: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'client',
        key: 'idClient'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    borne_depart: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'borne',
        key: 'idBorne'
      }
    },
    borne_arrivee: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'borne',
        key: 'idBorne'
      }
    }
  }, {
    tableName: 'utilise',
    freezeTableName: true
  });
};
