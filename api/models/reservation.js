/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reservation', {
    vehicule: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'vehicule',
        key: 'idVehicule'
      }
    },
    client: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'client',
        key: 'idClient'
      }
    },
    date_reservation: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    date_echeance: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'reservation',
    freezeTableName: true
  });
};
