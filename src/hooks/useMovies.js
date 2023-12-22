import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'
// import responseNoMovies from '../mock/notData.json'
// e08ee384

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)
  const sortedMovies = useMemo(() => {
    if (sort) {
      return [...movies].sort((a, b) => a.title.localeCompare(b.title))
    } else {
      return movies
    }
  }, [sort, movies])

  const getMovies = useCallback(async ({ search }) => {
    if (previousSearch.current === search) return null
    try {
      setLoading(true)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } finally {
      setLoading(false)
    }
  }, [])

  return { movies: sortedMovies, getMovies, loading }
}
