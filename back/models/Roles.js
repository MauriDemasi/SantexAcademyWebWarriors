const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db-config");

const Roles = sequelize.define(
  "roles",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

Roles.bulkCreateDefaultRoles = async () => {
  const rolesData = [{ name: "Voluntario" }, { name: "Administrador" }];

  await Roles.bulkCreate(rolesData);
};

module.exports = Roles;
