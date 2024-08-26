const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * 명언 객체
 */
const quote = sequelize.define('quote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "명언 내용"
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "명언을 남긴 사람"
  },
  authorProfile: {
    type: DataTypes.STRING,
    comment: "명언을 남긴 사람에 대한 설명"
  },
}, {
  timestamps: true,
  createdAt: "create_date",
  modifiedAt: "modify_date",
});

module.exports = quote;
