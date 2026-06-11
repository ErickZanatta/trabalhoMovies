import { DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

const Movie = sequelize.define(
  'Movie',
  {
    id: {
      type:          DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:    true,
    },

    title: {
      type:      DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title must not be empty.',
        },
        notNull: {
          msg: 'Title is required.',
        },
      },
    },

    director: {
      type:         DataTypes.STRING(255),
      allowNull:    true,
      defaultValue: null,
    },

    watched: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: false,
    },
  },
  {
    tableName: 'movies',
    timestamps: true,
  }
);

export default Movie;
