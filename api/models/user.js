import bcrypt from 'bcrypt';
export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
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
