export let timeout

const debounce = (time, callback) => {
  
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    callback()
  }, time);
}

export const API_HOST = process.env.NODE_ENV === 'production' ? 'https://sebbe.dev/studentprojekt/api' : 'http://localhost:3333'

export const HOST = process.env.PUBLIC_URL

export default debounce