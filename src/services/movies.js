const API_KEY = 'e08ee384'
export async function searchMovies({ search }) {
  if (search === '') return null
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=2`
    )
    const jsonResponse = await response.json()

    const movies = jsonResponse.Search

    const mappedMovies = movies?.map((movie) => {
      return {
        id: movie.imdbID,
        poster: movie.Poster,
        title: movie.Title,
        year: movie.Year
      }
    })
    return mappedMovies
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
