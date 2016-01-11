import bcrypt from 'bcrypt';
import lodash from 'lodash';

export default function model(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      comparePassword: function(password, callback) {
        const match = bcrypt.compareSync(password, this.password);
        callback(null, match);
      },
      toJSON: function() {
        const privateAttributes = [ 'password' ];
        return lodash.omit(this.dataValues, privateAttributes);
      }
    }

  });

  const hashPasswordHook = function(instance/* , options*/) {
    if (instance.changed('password')) {
      const hash = bcrypt.hashSync(instance.get('password'), 10);
      instance.password = hash;
    }
  };

  User.beforeCreate(hashPasswordHook);
  User.beforeUpdate(hashPasswordHook);

  return User;
}
