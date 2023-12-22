import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort, page }) {
  const [movies, setMovies] = useState({ mappedMovies: [], totalPages: null })
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)
  const previousPage = useRef(page)
  const sortedMovies = useMemo(() => {
    if (sort) {
      return [...movies.mappedMovies].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    } else {
      return movies.mappedMovies
    }
  }, [sort, movies])

  const getMovies = useCallback(async ({ search, page }) => {
    if (previousSearch.current === search && previousPage.current === page) {
      return null
    }
    try {
      setLoading(true)
      previousSearch.current = search
      previousPage.current = page
      const newMovies = await searchMovies({ search, page })
      if (newMovies !== null) {
        setMovies(newMovies)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    movies: sortedMovies,
    getMovies,
    loading,
    totalPages: movies.totalPages
  }
}
