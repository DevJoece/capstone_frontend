let forgotBtn = document.querySelector('.forgot-btn')
let emailInput = document.getElementById('email')
localStorage.setItem('userEmail', emailInput)
let form = document.querySelector('.forgot-container')


form.addEventListener('submit',doThis)

function doThis(e){
    e.preventDefault()
    const email = emailInput.value.trim()
    fetch('https://my-style-mag-backend.onrender.com/api/v1/auth/send-otp', {
        method:"POST",
        headers:{'Content-Type': 'application/json' },
        body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(data)
    

    .catch(err => {
        console.log(err)
    })
}