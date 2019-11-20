export let timeout

const debounce = (time, callback) => {
  
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    callback()
  }, time);
}

export default debounce