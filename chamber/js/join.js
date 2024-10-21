// / Show modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Set timestamp value
// document.getElementById('timestamp').value = new Date().toISOString();


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
        });



        document.addEventListener("DOMContentLoaded", function() {
            const visitorInfo = document.querySelector(".visitor-info");
            const lastVisit = localStorage.getItem("lastVisit");
            const now = Date.now();
            
            if (lastVisit) {
                const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
                
                if (daysBetween < 1) {
                    visitorInfo.textContent = "Back so soon! Awesome!";
                } else if (daysBetween === 1) {
                    visitorInfo.textContent = "You last visited 1 day ago.";
                } else {
                    visitorInfo.textContent = `You last visited ${daysBetween} days ago.`;
                }
            } else {
                visitorInfo.textContent = "Welcome! Let us know if you have any questions.";
            }
        
            localStorage.setItem("lastVisit", now);
        });
        


        document.addEventListener("DOMContentLoaded", function() {
            const daysContainer = document.getElementById('days');
            const monthYearDisplay = document.querySelector('.month-year');
            const prevButton = document.querySelector('.prev-month');
            const nextButton = document.querySelector('.next-month');
        
            let currentDate = new Date();
        
            // Helper function to get the number of days in a month
            function getDaysInMonth(year, month) {
                return new Date(year, month + 1, 0).getDate();
            }
        
            // Helper function to generate the calendar days
            function generateCalendar(year, month) {
                daysContainer.innerHTML = ''; // Clear previous days
                const firstDay = new Date(year, month, 1).getDay(); // Day of the week the month starts on
                const daysInMonth = getDaysInMonth(year, month);
        
                let row = document.createElement('tr');
                
                // Create empty cells for the days before the start of the month
                for (let i = 0; i < firstDay; i++) {
                    const emptyCell = document.createElement('td');
                    row.appendChild(emptyCell);
                }
        
                // Create cells for each day in the month
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayCell = document.createElement('td');
                    dayCell.textContent = day;
                    dayCell.addEventListener('click', () => {
                        alert(`You selected ${day} ${month + 1} ${year}`);
                    });
                    row.appendChild(dayCell);
        
                    // If the row has 7 days, create a new row
                    if ((firstDay + day) % 7 === 0) {
                        daysContainer.appendChild(row);
                        row = document.createElement('tr');
                    }
                }
        
                // Add the remaining row if it's incomplete
                if (row.children.length > 0) {
                    daysContainer.appendChild(row);
                }
        
                // Update the month and year display
                monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
            }
        
            // Handle previous month button
            prevButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            });
        
            // Handle next month button
            nextButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            });
        
            // Initial calendar generation for the current month
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });

        


        document.addEventListener("DOMContentLoaded", function() {
            const lazyImages = document.querySelectorAll('img.lazy-load');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src'); // Set the actual image source
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-load'); // Optional: remove the lazy class
                        observer.unobserve(img); // Stop observing the image once loaded
                    }
                });
            }, { rootMargin: '0px 0px 100px 0px', threshold: 0.1 }); // Adjust root margin if necessary
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        });