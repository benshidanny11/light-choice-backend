'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    pid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pname: DataTypes.STRING,
    pmark: DataTypes.STRING,
    pdesc: DataTypes.STRING,
    ptags:DataTypes.ARRAY(DataTypes.STRING) ,
    pimage: DataTypes.STRING ,
    pprice: DataTypes.DOUBLE,
    uid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};