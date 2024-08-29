const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const quoteModel = require("./quote")

/**
 * 오늘의 명언
 */
const todayQuoteModel = sequelize.define('todayQuote', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
},
  quoteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: quoteModel,
        key: 'id'
    },
    comment: "명언 pk",
  },
}, {
  timestamps: true,
  underscored: true,
  createdDate: "create_date",
  createdDate: "update_date",
});

quoteModel.hasMany(todayQuoteModel, { foreignKey: 'quoteId' });
todayQuoteModel.belongsTo(quoteModel, { foreignKey: 'quoteId' });

module.exports = todayQuoteModel;
