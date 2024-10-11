// / Show modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Set timestamp value



const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Add a click event listener to toggle the menu
hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');  // Toggle the 'active' class to show/hide links
});





  // Function to get query parameters from the URL
        function getQueryParams() {
            const params = {};
            const queryString = window.location.search.slice(1);
            const paramPairs = queryString.split('&');
            
            paramPairs.forEach(pair => {
                const [key, value] = pair.split('=');
                params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
            });

            return params;
        }

        // Populate the thank you page with the form data
        document.addEventListener('DOMContentLoaded', function() {
            const params = getQueryParams();

            // Displaying the form data in respective fields
            document.getElementById('display-first-name').textContent = params.firstName || 'N/A';
            document.getElementById('display-last-name').textContent = params.lastName || 'N/A';
            document.getElementById('display-email').textContent = params.email || 'N/A';
            document.getElementById('display-phone').textContent = params.phone || 'N/A';
            document.getElementById('display-organization').textContent = params.organization || 'N/A';
            document.getElementById('display-timestamp').textContent = params.timestamp || 'N/A';
            document.getElementById('timestamp').value = new Date().toISOString();
        });