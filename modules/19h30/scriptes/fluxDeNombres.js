const loop = (number, callback) => {
  if (number === 10) {
    return callback()
  }
  console.log(number)
  setTimeout(() => {
    loop(number + 1, callback)
  }, 200)
}

loop(1, () => console.log(10))
