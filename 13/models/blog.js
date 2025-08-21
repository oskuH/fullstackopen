const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../util/db');

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: new Date().getFullYear()
    }
  },
  likes: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
});

module.exports = Blog;