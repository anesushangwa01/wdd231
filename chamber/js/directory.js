const requestURL = 'http://localhost:5500/wdd231/chamber/data/members.json';
const cards = document.querySelector('.cards');
const listButton = document.querySelector("#list-btn");
const cardButton = document.querySelector("#card-btn");

// Async function to fetch and display data
async function fetchBusinesses() {
    try {
        const response = await fetch(requestURL);
        const jsonObject = await response.json();
        console.table(jsonObject); // Temporary checking for valid response and data parsing
        const businesses = jsonObject['busineses'];
        businesses.forEach(displayBusinessesGrid); // Initial display as a grid
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display businesses in grid view
function displayBusinessesGrid(business) {
    const card = document.createElement('section');
    const image = document.createElement('img');
    const membershipLevel = document.createElement('p');
    const phoneNumber = document.createElement('p');
    const location = document.createElement('p');
    const website = document.createElement('a'); // Changed from <p> to <a> for website

    image.src = business.imageurl;
    image.setAttribute('alt', business.name);
    image.style.width = '100px';
    image.style.height = 'auto';
    card.appendChild(image);
    
    membershipLevel.textContent = `Membership level: ${business.membershiplevel}`;
    card.appendChild(membershipLevel);

    phoneNumber.textContent = `Phone number: ${business.phonenumber}`;
    card.appendChild(phoneNumber);

    location.textContent = `Location: ${business.name}`;
    card.appendChild(location);

    website.textContent = 'Website'; // Text for the link
    website.href = business.website; // Correctly setting the href attribute
    website.target = '_blank'; // Open in a new tab
    card.appendChild(website);

    cards.appendChild(card);
}

// Function to display businesses in list view (table format)
function displayBusinessesList(businesses) {
    // Clear the cards container
    cards.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Define table headers
    ['Image', 'Membership Level', 'Phone Number', 'Location', 'Website'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    businesses.forEach(business => {
        const row = document.createElement('tr');
        const imgCell = document.createElement('td');
        const membershipCell = document.createElement('td');
        const phoneCell = document.createElement('td');
        const locationCell = document.createElement('td');
        const websiteCell = document.createElement('td');

        const image = document.createElement('img');
        image.src = business.imageurl;
        image.setAttribute('alt', business.name);
        image.style.width = '50px'; // Adjust image size for table
        imgCell.appendChild(image);

        membershipCell.textContent = business.membershiplevel;
        phoneCell.textContent = business.phonenumber;
        locationCell.textContent = business.name;
        const websiteLink = document.createElement('a'); // Changed from innerHTML to createElement
        websiteLink.textContent = business.website; // Text for the link
        websiteLink.href = business.website; // Correctly setting the href attribute
        websiteLink.target = '_blank'; // Open in a new tab
        websiteCell.appendChild(websiteLink);

        row.appendChild(imgCell);
        row.appendChild(membershipCell);
        row.appendChild(phoneCell);
        row.appendChild(locationCell);
        row.appendChild(websiteCell);
        table.appendChild(row);
    });

    cards.appendChild(table);
}

// Event listener for Grid View
cardButton.addEventListener("click", async () => {
    cards.classList.remove("list-view");
    cards.classList.add("grid-view");

    cards.innerHTML = ''; // Clear the container
    await fetchBusinesses(); // Fetch and display businesses as grid
});

// Event listener for List View
listButton.addEventListener("click", async () => {
    cards.classList.remove("grid-view");
    cards.classList.add("list-view");

    try {
        const response = await fetch(requestURL);
        const jsonObject = await response.json();
        const businesses = jsonObject['busineses'];
        displayBusinessesList(businesses); // Show in table format
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Initial fetch to display businesses
fetchBusinesses();

