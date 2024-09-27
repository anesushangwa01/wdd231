const requestURL = 'http://localhost:5500/wdd231/chamber/data/members.json';
const cards = document.querySelector('.cards');
const listButton = document.querySelector("#list-btn");
const cardButton = document.querySelector("#card-btn");

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const businesses = jsonObject['busineses'];
    businesses.forEach(displayBusinessesGrid);  // Initial display as a grid
  });

// Function to display businesses in grid view
function displayBusinessesGrid(business) {
    const card = document.createElement('section');
    const image = document.createElement('img');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const p1 = document.createElement('p');
    const p5 = document.createElement('h4');

    image.src = business.imageurl;
    image.setAttribute('alt', business.name);
    card.appendChild(image);
    p5.textContent = `  ${business.names}`;
    card.appendChild(p5);

    p2.textContent = `Membership level:  ${business.membershiplevel}`;
    card.appendChild(p2);

    p3.textContent = `Phone number:  ${business.phonenumber}`;
    card.appendChild(p3);

    p4.textContent = `Location: ${business.name}`;
    card.appendChild(p4);

    p1.textContent = `Website: ${business.website}`;
    card.appendChild(p1);

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
        image.style.width = '50px';  // Adjust image size for table
        imgCell.appendChild(image);

        membershipCell.textContent = business.membershiplevel;
        phoneCell.textContent = business.phonenumber;
        locationCell.textContent = business.name;
        websiteCell.innerHTML = `<a href="${business.website}" target="_blank">${business.website}</a>`;

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
cardButton.addEventListener("click", () => {
    cards.classList.remove("list-view");
    cards.classList.add("grid-view");

    cards.innerHTML = ''; // Clear the container
    fetch(requestURL)
        .then(response => response.json())
        .then(jsonObject => {
            const businesses = jsonObject['busineses'];
            businesses.forEach(displayBusinessesGrid);
        });
});

// Event listener for List View
listButton.addEventListener("click", () => {
    cards.classList.remove("grid-view");
    cards.classList.add("list-view");

    fetch(requestURL)
        .then(response => response.json())
        .then(jsonObject => {
            const businesses = jsonObject['busineses'];
            displayBusinessesList(businesses);  // Show in table format
        });
});
