const readline = require('readline')

const operation = process.argv[2]
const number = Number(process.argv[3])

const reader = readline.createInterface({
  input: process.stdin,
})

reader.on('line', line => {
  const value = Number(line)
  if (operation === '+' && !isNaN(number)) {
    console.log(value + number)
  } else if (operation === '-' && !isNaN(number)) {
    console.log(value - number)
  } else if (operation === 'x' && !isNaN(number)) {
    console.log(value * number)
  } else if (operation === '/' && !isNaN(number)) {
    console.log(value / number)
  } else {
    console.log(value)
  }
})