console.log('this is client side js')



const form = document.querySelector('form')
const input = document.querySelector('input')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchVal = input.value
  const messageOne = document.querySelector('#messageOne')
  const messageTwo = document.querySelector('#messageTwo')

  messageOne.textContent = 'Searching...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${searchVal}`).then((response) => {
    response.json().then((data) => {
       console.log(data)
      if (data.error) {
        messageOne.textContent = data.error
        messageTwo.textContent = ''
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})