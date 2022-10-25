export const setupCounter = (element) => {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Bob says: count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
