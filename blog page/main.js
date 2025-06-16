let menuOptions = document.querySelectorAll('.menu-options');
let searchInput = document.querySelector('.table-search')
let rows = document.querySelectorAll('tbody tr')



searchInput.addEventListener('keyup', (e) => {
    let value = e.target.value.toLowerCase();
    rows.forEach(row => {
        let title = row.querySelector('.truncate').textContent.toLowerCase();
        if (title.includes(value)){
            row.style.display = 'table-row'
        } else {
            row.style.display = 'none'
        }
    })
})


document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('#btn').forEach(button => {
        button.addEventListener('click', (e) => {
            menuOptions.forEach(option => {
                option.style.visibility = 'visible'
                if (option !== button.nextElementSibling){
                    option.style.visibility = 'hidden'
                }
            })
            e.stopPropagation()
        }) 
    })
    document.addEventListener('click',() => {
       menuOptions.forEach(option => {
           option.style.visibility = 'hidden'
       })
    })
});


