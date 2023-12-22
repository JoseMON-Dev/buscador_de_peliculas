import { useEffect, useState, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('You must specify a search')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('You cannot search a movie using numbers only')
      return
    }
    if (search.length < 3) {
      setError('The Search must be at least 3 characters')
      return
    }
    setError(null)
  }, [search])

  return { search, error, updateSearch }
}
