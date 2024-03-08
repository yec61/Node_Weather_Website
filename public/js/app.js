const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')  
//const messageOne = document.querySelector('.className')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    messageOne.textContent = 'Loading request ...'
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?adress='+ location ).then((response)=> {
        response.json().then((data)=> {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
})

})