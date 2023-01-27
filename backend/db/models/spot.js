'use strict';
const {
  Model, User
} = require('sequelize');
const { restoreUser } = require('../../utils/auth');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static async createspot({ ownerId, address, city, state, country, lat, lng, name, description, price }) {
      const spot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });
      return await Spot.scope('currentSpot').findByPk(spot.id)
    }
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: "CASCADE", hooks: true })
      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: "CASCADE", hooks: true })
      Spot.hasMany(models.Image, {
        foreignKey: 'imageId', as: "ReviewImages",
        onDelete: "CASCADE",
        hooks: true,
        constraints: false,
        scope: {
          imageType: 'Spot'
        }
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avgRating: {
      type: DataTypes.DECIMAL,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      currentSpot: {
        attributes: { exclude: ['avgRating', 'previewImage'] }
      },
    }
  });
  return Spot;
};
