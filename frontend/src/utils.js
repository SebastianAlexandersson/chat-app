const debounce = (time, callback) => {
  let timeout
  
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    callback()
  }, time);
}

export default debounce