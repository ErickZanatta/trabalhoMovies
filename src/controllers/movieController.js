import Movie from '../models/Movie.js';

const buildResponse = ({ success, data = null, message = '' }) => ({
  success,
  data,
  message,
});

export const createMovie = async (req, res) => {
  try {
    const { title, director, watched } = req.body;

    if (!title || String(title).trim() === '') {
      return res.status(400).json(
        buildResponse({ success: false, message: 'Field "title" is required and must not be empty.' })
      );
    }

    const movie = await Movie.create({
      title: String(title).trim(),
      director: director ? String(director).trim() : null,
      watched: watched ?? false,
    });

    return res.status(201).json(
      buildResponse({ success: true, data: movie, message: 'Movie created successfully.' })
    );
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e) => e.message).join('; ');
      return res.status(400).json(buildResponse({ success: false, message: messages }));
    }

    console.error('[createMovie]', error);
    return res.status(500).json(buildResponse({ success: false, message: 'Internal server error.' }));
  }
};

export const getAllMovies = async (_req, res) => {
  try {
    const movies = await Movie.findAll({ order: [['createdAt', 'DESC']] });

    return res.status(200).json(
      buildResponse({ success: true, data: movies, message: `${movies.length} movie(s) found.` })
    );
  } catch (error) {
    console.error('[getAllMovies]', error);
    return res.status(500).json(buildResponse({ success: false, message: 'Internal server error.' }));
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json(
        buildResponse({ success: false, message: `Movie with id ${req.params.id} not found.` })
      );
    }

    return res.status(200).json(
      buildResponse({ success: true, data: movie, message: 'Movie found.' })
    );
  } catch (error) {
    console.error('[getMovieById]', error);
    return res.status(500).json(buildResponse({ success: false, message: 'Internal server error.' }));
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json(
        buildResponse({ success: false, message: `Movie with id ${req.params.id} not found.` })
      );
    }

    const { title, director, watched } = req.body;

    if (title !== undefined && String(title).trim() === '') {
      return res.status(400).json(
        buildResponse({ success: false, message: 'Field "title" must not be empty.' })
      );
    }

    await movie.update({
      title: title !== undefined ? String(title).trim() : movie.title,
      director: director !== undefined ? String(director).trim() : movie.director,
      watched: watched !== undefined ? watched : movie.watched,
    });

    return res.status(200).json(
      buildResponse({ success: true, data: movie, message: 'Movie updated successfully.' })
    );
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e) => e.message).join('; ');
      return res.status(400).json(buildResponse({ success: false, message: messages }));
    }

    console.error('[updateMovie]', error);
    return res.status(500).json(buildResponse({ success: false, message: 'Internal server error.' }));
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json(
        buildResponse({ success: false, message: `Movie with id ${req.params.id} not found.` })
      );
    }

    await movie.destroy();

    return res.status(200).json(
      buildResponse({ success: true, data: null, message: 'Movie deleted successfully.' })
    );
  } catch (error) {
    console.error('[deleteMovie]', error);
    return res.status(500).json(buildResponse({ success: false, message: 'Internal server error.' }));
  }
};
