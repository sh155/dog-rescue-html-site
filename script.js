// --- DATA STRUCTURES & STATE ---
const rescuePets = [
  { id: 1, name: "Luna", breed: "Labrador Mix", age: "2 years" },
  { id: 2, name: "Max", breed: "German Shepherd", age: "3 years" },
  { id: 3, name: "Bella", breed: "Beagle Mix", age: "1 year" }
];

let userFavorites = JSON.parse(localStorage.getItem("userFavorites")) || [];

// --- FEATURE 1: INTERACTIVE FAVORITES TRACKER ---
function displayPets() {
  const container = document.getElementById("pet-list-container");
  if (!container) return;
  
  container.innerHTML = "";
  rescuePets.forEach(pet => {
    const isFav = userFavorites.some(fav => fav.id === pet.id);
    const petCard = document.createElement("div");
    petCard.className = "pet-card";
    petCard.innerHTML = `
      <h4>${pet.name} (${pet.breed})</h4>
      <p>Age: ${pet.age}</p>
      <button onclick="toggleFavorite(${pet.id})">
        ${isFav ? "★ Remove from Favorites" : "☆ Save to Favorites"}
      </button>
    `;
    container.appendChild(petCard);
  });
}

function toggleFavorite(petId) {
  const pet = rescuePets.find(p => p.id === petId);
  const index = userFavorites.findIndex(fav => fav.id === petId);

  if (index > -1) {
    userFavorites.splice(index, 1); // Remove if already favorited
  } else {
    userFavorites.push(pet); // Add to favorites
  }

  // Save to localStorage
  localStorage.setItem("userFavorites", JSON.stringify(userFavorites));
  displayPets();
  displayFavoritesList();
}

function displayFavoritesList() {
  const favContainer = document.getElementById("favorites-container");
  if (!favContainer) return;

  favContainer.innerHTML = "<h3>Your Saved Favorites</h3>";
  if (userFavorites.length === 0) {
    favContainer.innerHTML += "<p>No favorites saved yet.</p>";
    return;
  }

  const ul = document.createElement("ul");
  userFavorites.forEach(fav => {
    const li = document.createElement("li");
    li.textContent = `${fav.name} - ${fav.breed}`;
    ul.appendChild(li);
  });
  favContainer.appendChild(ul);
}

// --- FEATURE 2: FORM VALIDATION ---
function setupFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function(event) {
    let isValid = true;

    // 1. Required Field Check (Name)
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // 2. Email Format Validation
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Prevent submission if validation fails
    if (!isValid) {
      event.preventDefault();
    }
  });
}

// Initialize on page load
window.onload = function() {
  displayPets();
  displayFavoritesList();
  setupFormValidation();
};