const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * 명언 객체
 */
const quoteModel = sequelize.define('quote', {
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
  category: {
    type: DataTypes.ENUM,
    values: ['인생', '성공', '동기부여', '사랑', '지혜', '개발'],
    allowNull: false,
    comment: "명언의 카테고리"
  }
}, {
  timestamps: true,
  createdAt: "create_date",
  modifiedAt: "modify_date",
});

module.exports = quoteModel;
