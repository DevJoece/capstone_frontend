let forgotBtn = document.querySelector('.forgot-btn')
let emailInput = document.getElementById('email')
let form = document.querySelector('.forgot-container')

const API_BASE = 'https://my-style-mag-backend.onrender.com/api/v1/auth'

form.addEventListener('submit',doThis)

function doThis(e){
    e.preventDefault()
    const email = emailInput.ariaValueMax.trim()
    fetch(`${API_BASE}/ send-otp`, {
        method:'POST',
        headers:
        { 'content-Type': 'application/json'},
        body:
        JSON.stringify({email,otp:code})

    })
    .then(res => res.json().then(data => ({status: res.status, ok:res.ok, body:data})))
    
}