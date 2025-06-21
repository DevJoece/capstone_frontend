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


document.addEventListener("DOMContentLoaded", function () {
  const addStyleBtn = document.getElementById("addStyleBtn");
  const styleModal = document.getElementById("styleModal");
  const viewModal = document.getElementById("viewModal");
  const closeBtns = document.querySelectorAll(".close, .close-view");

  // Categories list with IDs and names
  const categories = {
    "851e8c8b-ecdd-458a-b8af-870fc908f318": "Traditional",
    "5778cda8-dca8-4ca9-812a-02888bc4df8e": "Office",
    "894ad7bc-5180-4e49-9c2f-bdb876bf1740":"Wedding"
  }
    
  
 
  
  // Populate category dropdown
  // function populateCategoryDropdown() {
  //   const categorySelect = document.getElementById("category");
  //   categorySelect.innerHTML =
  //     '<option value="" disabled selected>Select category</option>';
  //   categories.forEach((category) => {
  //     const option = document.createElement("option");
  //     option.value = category.id;
  //     option.textContent = category.name;
  //     categorySelect.appendChild(option);
  //   });
  // }
 

  // Format date
  function formatDate(date) {
    const suffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const day = date.getDate();
    return `${day}${suffix(day)} ${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`;
  }

  function updateStyleCount() {
    const count = document.querySelectorAll(".users-table tbody tr").length;
    document.getElementById("styleCount").textContent = `(${count})`;
  }

  // Load styles from API
  function loadOutfit() {
    fetch("https://my-style-mag-backend.onrender.com/api/v1/outfits", {
      method: "GET",
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
        const styles = data.data || data.outfits || []
        console.log("Fetched styles:",styles)
        styles.forEach((style) => addStyleToTable(style));
        updateStyleCount();
        
      })
    .catch((err) => console.error("Error loading styles:", err));
  }

  // Add style to table
  function addStyleToTable(style) {
    const table = document.querySelector(".styles-table tbody");
    const styleId = style._id || style.id
    if(!styleId) return;

    const categoryName = categories [style.category]|| "Unknown";
    // const imageUrl = style.imageurl?.[0] || 'https://via.placeholder.com/50'


   
    const newRow = table.insertRow();

    newRow.innerHTML = `
       <tr id = "${styleId}">
       <td><input type="checkbox" /></td>
       <td class="title-cell">
       <img src="${style.imageUrls}" alt="${style.title}" class="thumb-img" />
       <span class="blog-title">${style.title}</span>
       </td>
       <td>${style.description}</td>
       <td>${categoryName}</td>
       <td>${formatDate(new Date(style.createdAt))}</td>
       <td><i class="ri-more-fill action-menu" style="cursor:pointer;" data-id="${styleId}"></i></td>
     </tr>`;
  
    // View modal
      //   
      // function openModal(image, title, description, category) {
      // document.getElementById("viewImage").src = image;
      // document.getElementById("viewTitle").textContent = title;
      // document.getElementById("viewDescription").textContent = description;
      // document.getElementById("viewCategory").textContent = "Category: " + category;
      // document.getElementById("view-modal").style.display = "block";
      // }

      // function closeModal() {
      //   document.getElementById("view-modal").style.display = "none";
      // }

    newRow.querySelector(".title-cell").addEventListener("click", () => {
      openModal(style.imageUrls, style.title, style.description, categoryName);
      viewModal.classList.add("show");
    })
  }
  // Open modal
  addStyleBtn.onclick = () => {
    // populateCategoryDropdown();
    styleModal.classList.add("show");
  };

  // Close modals
  closeBtns.forEach(
    (btn) =>
      (btn.onclick = () => {
        styleModal.classList.remove("show");
        viewModal.classList.remove("show");
      })
  );

  window.onclick = function (event) {
    if (event.target === styleModal) styleModal.classList.remove("show");
    if (event.target === viewModal) viewModal.classList.remove("show");
  };

  // Create new blog
  document.getElementById("styleForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = JSON.parse(document.getElementById("category").value);
    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("image").files;

    if (imageFile.length === 0) {
      alert("Please upload an image.");
      return;

    }
    if (!title) {
      alert("Please fill in the title.");
      return;
    }
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryId", (category._id));
    for(let i=0; i<imageFile.length; i++){
      formData.append("image", imageFile[i])
    }

    

    fetch("https://my-style-mag-backend.onrender.com/api/v1/outfits", {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: formData
    })
      .then(async res => {
          if(!res.ok){
            const err = await res.json();
            throw new Error(err.message || "Server error");
          }
          return res.json();
            
      })
      .then((data) => {
          addStyleToTable(data);
          updateStyleCount();
          this.reset();
          styleModal.classList.remove("show");
          alert("Style added successfully!");
      })
      .catch((err) => {
        console.error("Error saving style:", err);
        alert("Failed to add style.");
      });
  });
  function openModal(image,title,description,category){
    document.getElementById("viewImage").src = image;
    document.getElementById("viewTitle").innerText = title;
    document.getElementById("viewDescription").innerText = description;
    document.getElementById("viewCategory").innerText = `category:${category}`;
    viewModal.classList.add("show");
  }
  function addStyleToTable(data) {
    const tableBody = document.getElementById("tableBody");
    const newRow = document.createElement("tr");
  }
  // Action menu (edit / delete)
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("action-menu")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => menu.remove());
    }

    if (e.target.classList.contains("action-menu")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => menu.remove());

      const dropdown = document.createElement("div");
      dropdown.className = "dropdown-menu";
      dropdown.innerHTML = `
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;

      const rect = e.target.getBoundingClientRect();
      dropdown.style.position = "fixed";
      dropdown.style.top = `${rect.bottom + 5}px`;
      dropdown.style.left = `${rect.left - 80}px`;
      document.body.appendChild(dropdown);

      // Delete blog
      dropdown.querySelector(".delete-btn").onclick = (styleId) => {
        // const styleId = e.target.getAttribute("data-id")
        if(!styleId || styleId === "undefined"){
            alert("Cannot delete style:Missing or invalid ID")
        }

        fetch(`https://my-style-mag-backend.onrender.com/api/v1/outfits/${styleId}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then(res => {
            console.log("Delete status:", res.status)
            if (res.ok){
                // e.target.closest("tr").remove();
                document.getElementById("styleId").remove()
                updateStyleCount();
                dropdown.remove();
                alert("Style deleted successfully!")
            } else {
                return res.json().then(err => {
                    console.error("Backend error:", err)
                    alert("Failed to delete style:" +(err.message || "Unknown error"))
                })
            }
          })
        
          .catch((err) => {
            console.error("Delete error:", err);
            alert("An error occurred while deleting.");
          });
      };

      // Edit (placeholder)
      dropdown.querySelector(".edit-btn").onclick = () => {
        alert("Edit functionality coming soon!");
        dropdown.remove();
      };
    }
  })

  // Initial outfit load
  loadOutfit();
  // populateCategoryDropdown();
})



