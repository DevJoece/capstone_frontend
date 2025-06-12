let inputPassword = document.getElementById('password')
let inputConfirmPassword = document.getElementById('confirm-password')
let message = document.querySelector('.message')
let eyePassword = document.getElementById('eye-password')
let eyeConfirm = document.getElementById('eye-confirm')
let form = document.getElementById('form')

form.addEventListener('submit',confirm)
eyePassword.addEventListener('click',togglePassword)
eyeConfirm.addEventListener('click',toggleConfirmPassword)


function confirm(e){
    e.preventDefault()
    console.log(inputPassword.value,inputConfirmPassword.value)
    if(inputPassword.value !== 0){
        if(inputPassword.value === inputConfirmPassword.value){
            message.innerHTML = ''
            inputConfirmPassword.style.borderColor =' #BFBFBF'
            window.location.href = '../password_changed/index.html'
         }else{
            message.innerHTML='password does not match'
            inputConfirmPassword.style.borderColor =' #EB4335'
         }
    }
    if(inputPassword.value === ''){
        alert('please enter your password')
    }


}

function togglePassword(e){
    if(inputPassword.type == "password"){
        inputPassword.type = "text"
        eyePassword.classList.remove("fa-eye-slash")
        eyePassword.classList.add("fa-eye")
    }else{
        inputPassword.type = "password"
        eyePassword.classList.remove("fa-eye")
        eyePassword.classList.add("fa-eye-slash")
    }


}

function toggleConfirmPassword(e){
        if(inputConfirmPassword.type == "password"){
            inputConfirmPassword.type = "text"
            eyeConfirm.classList.remove("fa-eye-slash")
            eyeConfirm.classList.add("fa-eye")
        }else{
            inputConfirmPassword.type = "password"
            eyeConfirm.classList.remove("fa-eye")
            eyeConfirm.classList.add("fa-eye-slash")
        }
    }
