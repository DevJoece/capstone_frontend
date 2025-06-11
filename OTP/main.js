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
    const email = emailInput.value.trim()

    fetch(`${API_BASE}/ verify-otp`, {
        method: 'POST',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,otp:code})

    })
    .then(res => res.json().then(data => ({status:res.status, ok: res.ok, body:data})))
    
}