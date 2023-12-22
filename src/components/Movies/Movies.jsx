import PropTypes from 'prop-types'
import './Movies.css'

function Movie({ title, year, imageUrl }) {
  return (
    <li className='item'>
      <h3>{title}</h3>
      <p>{year}</p>
      <img src={imageUrl} alt={title} />
    </li>
  )
}

Movie.propTypes = {
  title: PropTypes.string,
  year: PropTypes.number,
  imageUrl: PropTypes.string
}

function MoviesList({ movies }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <Movie
          title={movie.title}
          year={parseInt(movie.year)}
          imageUrl={movie.poster}
          key={movie.id}
        />
      ))}
    </ul>
  )
}

MoviesList.propTypes = { movies: PropTypes.arrayOf(PropTypes.object) }

function NoMoviesResult() {
  return <p>Any movie wasn't found</p>
}

function Movies({ movies }) {
  const hasMovies = movies && movies.length > 0

  return hasMovies ? <MoviesList movies={movies} /> : <NoMoviesResult />
}

Movies.propTypes = { movies: PropTypes.arrayOf(PropTypes.object) }

export default Movies
