export function debounce(fn, delay) {
  let timeoutId

  function debounced(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }

  debounced.cancel = () => clearTimeout(timeoutId)

  return debounced
}
