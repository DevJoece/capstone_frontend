const inputs = document.querySelectorAll("input")
let btnVerify = document.querySelector("#verify-btn")

inputs.forEach((input,index1) => {
    input.addEventListener("keyup",(e) =>{
        const currentInput = input,
           nextInput = input.nextElementSibling,
           prevInput = input.previousElementSibling
        // if the value has more than one character clear it
           if(currentInput.value.length > 1){
             currentInput.value = ""
             return 
           }

           // if the next input is diasbled and current value is not empty
           // enable the next input and focus on it
           if(nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== ""){
               nextInput.removeAttribute("disabled")
               nextInput.focus()
           }

           // if backspace key is pressed
           if(e.key === "Backspace"){
               //iterate over all input
               inputs.forEach((input, index2) => {
                  if(index1 <= index2 && prevInput){
                      input.setAttribute("disabled",true)
                      currentInput.value = ""
                  }
               })
           }
           if(!inputs[5].disabled && inputs[5].value !== ""){
               btnVerify.classList.add("active")
               return;
           }
           btnVerify.classList.remove("active")
    })
})  
        


    

window.addEventListener("load",() => inputs[0].focus())

btnVerify.addEventListener('click', func)

function func(e){
    e.preventDefault()
    const otp= Array.from(inputs).map(i => i.value).join('')
    const email = localStorage.getItem('userEmail')

    fetch('https://my-style-mag-backend.onrender.com/api/v1/verifyResetToken', {
        headers:{"Content-Type": 'application/json'},
        body: JSON.stringify({email, otp})
    })
    .then(res => {
        console.log(res)
    })
    .then(data => {
        console.log(data.resetToken)
        console.log(data.email)
        
        if(data.resetToken === otp){
            window.location.href = '../reset password/index.html'
            
        }
    })
        
    


    .catch (err => {
        console.log(err)
    }) 
    }

   

    
