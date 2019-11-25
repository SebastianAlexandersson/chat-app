export let timeout

const debounce = (time, callback) => {
  
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    callback()
  }, time);
}

export const HOST = process.env.PUBLIC_URL

export const API_HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3333/api'

export default debounce