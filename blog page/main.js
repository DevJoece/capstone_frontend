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





// Open and close modals
const addBlogBtn = document.getElementById("addBlogBtn");
const blogModal = document.getElementById("blogModal");
const viewModal = document.getElementById("viewModal");
const closeBtns = document.querySelectorAll(".close, .close-view");

addBlogBtn.onclick = () => blogModal.classList.add("show");

closeBtns.forEach(btn => btn.onclick = () => {
  blogModal.classList.remove("show");
  viewModal.style.display = "none";
});

window.onclick = function(event) {
  if (event.target === blogModal) blogModal.classList.remove("show");
  if (event.target === viewModal) viewModal.style.display = "none";
};


// Form submission
document.getElementById("blogForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;
  const status = document.getElementById("status").value;
  const views = document.getElementById("views").value;
  const date = new Date().toLocaleString();

  const table = document.getElementById("blogTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${title}</td>
    <td>${category}</td>
    <td>${status}</td>
    <td>${date}</td>
    <td>${date}</td>
    <td>${views}</td>
  `;

  // Store data in dataset for easy access later
  newRow.dataset.title = title;
  newRow.dataset.content = content;
  newRow.dataset.category = category;
  newRow.dataset.status = status;
  newRow.dataset.modified = date;
  newRow.dataset.views = views;

  // Click to view full blog details
  newRow.addEventListener("click", function() {
    document.getElementById("viewTitle").innerText = this.dataset.title;
    document.getElementById("viewCategory").innerText = `Category: ${this.dataset.category}`;
    document.getElementById("viewContent").innerText = this.dataset.content;
    document.getElementById("viewStatus").innerText = `Status: ${this.dataset.status}`;
    document.getElementById("viewModified").innerText = `Modified: ${this.dataset.modified}`;
    document.getElementById("viewViews").innerText = `Views: ${this.dataset.views}`;
    viewModal.style.display = "block";
  });

  // Reset form and close modal
    this.reset();
    blogModal.classList.remove("show");
});


const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const uploadText = document.getElementById("uploadText");
const removeImageBtn = document.getElementById("removeImageBtn");

// Handle image preview
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      uploadText.style.display = "none";
      removeImageBtn.style.display = "flex";
    };
    reader.readAsDataURL(file);
  }
});

// Remove image and reset
removeImageBtn.addEventListener("click", function () {
  imageInput.value = "";
  imagePreview.src = "";
  imagePreview.style.display = "none";
  uploadText.style.display = "block";
  removeImageBtn.style.display = "none";
});



