import toast from 'react-hot-toast'

export const handleApiError = (error, fallback = 'Something went wrong') => {
  const msg = error?.response?.data?.message || fallback
  console.error(msg)
  toast.error(msg)
}
