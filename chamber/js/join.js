// / Show modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Set timestamp value
document.getElementById('timestamp').value = new Date().toISOString();


const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Add a click event listener to toggle the menu
hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');  // Toggle the 'active' class to show/hide links
});
