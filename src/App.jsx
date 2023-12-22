import { useCallback, useState } from 'react'
import Movies from './components/Movies/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import debounce from 'just-debounce-it'

const errStyles = { color: 'red' }

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch('')
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(({ search }) => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies({ search: newSearch })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <header>
        <h1>movie search</h1>
        <form
          style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
          className='form'
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleChange}
            name='query'
            type='text'
            placeholder='avengers, the matrix ...'
          />
          <label>
            <input type='checkbox' onChange={handleSort} />
            Sort By Years
          </label>
          <button type='submit'>Search</button>
        </form>
        {error ? <p style={errStyles}>{error}</p> : null}
      </header>

      <main>{loading ? <h1>Loading...</h1> : <Movies movies={movies} />}</main>
    </>
  )
}

export default App
