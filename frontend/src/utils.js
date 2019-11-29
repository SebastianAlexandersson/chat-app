export let timeout

const debounce = (time, callback) => {
  
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    callback()
  }, time);
}

export const HOST = process.env.NODE_ENV === 'production' ? 'https://sebbe.dev/studentprojekt' : 'http://dev.sebbelocal.com'

export const URL = process.env.PUBLIC_URL || ''

export default debounce