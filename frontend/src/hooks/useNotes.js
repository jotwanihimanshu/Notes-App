import { useEffect, useState } from 'react'
import api from '../lib/axios'
import { handleApiError } from '../lib/handleApiError'

export const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [isRateLimited, setIsRateLimited] = useState(false)

  useEffect(() => {
    api.get('/notes')
      .then((res) => {
        setNotes(res.data)
        setIsRateLimited(false)
      })
      .catch((err) => {
        if (err.response?.status === 429) {
          setIsRateLimited(true)
          toast.error('Rate limit reached. Try again later.')
        } else {
          handleApiError(err, 'Failed to fetch notes')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return { notes, setNotes, loading, isRateLimited }
}
