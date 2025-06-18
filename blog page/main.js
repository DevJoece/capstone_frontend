let menuOptions = document.querySelectorAll('.menu-options');
let searchInput = document.querySelector('.table-search')
let rows = document.querySelectorAll('tbody tr')
let deleteBtn = document.querySelectorAll('.delete')



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
    let activeRow = null
    document.querySelectorAll('#btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentMenu = button.nextElementSibling
            const clickedRow = button.closest('tr')
            const checkBox = clickedRow.querySelector('input[type="checkbox"]')

            e.stopPropagation()
            
            if(activeRow && activeRow !== clickedRow){
                const previousCheckBox = activeRow.querySelector('input[type="checkbox"]')
                if(previousCheckBox) previousCheckBox.checked = false
                activeRow.classList.remove('checked-row')
            } 
            if(checkBox) {
                checkBox.checked = true
                clickedRow.classList.add('checked-row')
            }
            menuOptions.forEach(option => {
                option.style.visibility = 'visible'
                if(option !== currentMenu){
                    option.style.visibility = 'hidden'
                }
                    
            })
            activeRow = clickedRow
        }) 
    
    })
    menuOptions.forEach(option => {
        option.addEventListener('click', (e) => e.stopPropagation())
    })
    document.addEventListener('click',() => {
        menuOptions.forEach(option => {
           option.style.visibility = 'hidden'
        })
        if (activeRow){
            const checkBox = activeRow.querySelector('input[type="checkbox"]')
            if (checkBox) checkBox.checked = false
            activeRow.classList.remove('checked-row')
            activeRow = null
        }
    })
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation()
            const rowToDelete = e.target.closest('tr')
            if (rowToDelete) rowToDelete.remove()
            if(rowToDelete === activeRow){
                activeRow = null
            }
        })
        
    })
    
    
    
});








