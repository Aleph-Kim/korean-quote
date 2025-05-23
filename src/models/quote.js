const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * 명언
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['인생', '성공', '동기부여', '사랑', '지혜', '개발']],
                msg: "올바른 카테고리를 입력해주세요."
            }
        },
        comment: "명언의 카테고리"
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "생성 시각"
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정 시각"
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = quoteModel;
