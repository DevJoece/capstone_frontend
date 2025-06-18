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