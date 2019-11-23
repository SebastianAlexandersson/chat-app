export let timeout

const debounce = (time, callback) => {
  
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    callback()
  }, time);
}

export const API_HOST = process.env.NODE_ENV === 'production' ? 'https://sebbe.dev/studenprojekt/api' : 'http://localhost:3333'

export default debounce