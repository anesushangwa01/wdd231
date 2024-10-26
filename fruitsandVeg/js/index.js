function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}



// URL to your JSON file containing the products data
const url = 'http://localhost:5500/wdd231/fruitsandveg/data/product.json';

// Fetch the product data
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    console.log(data); // Log the product data to the console
    displayProducts(data.products); // Call a function to display the products
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// Function to display products on your webpage
function displayProducts(products) {
  const productContainer = document.getElementById('product-container');
  
  // Loop through the product list and create HTML for each product
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    productElement.innerHTML = `
      <img src="${product.imageurl}" alt="${product.name}">
      <h2>${product.name}</h2>

      <p>${product.description}</p>
      <span>Price: ${product.price}</span> <br>
      <a href="${product.orderurl}"> order here</a>
    `;

    productContainer.appendChild(productElement);
  });
}





// Function to parse URL parameters
function getQueryParams() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Populate order details
function displayOrderDetails() {
    const params = getQueryParams();
    const detailsDiv = document.getElementById('order-details');
    detailsDiv.innerHTML = `
        <p><strong>Product:</strong> ${params.product}</p>
        <p><strong>Quantity:</strong> ${params.quantity} kg</p>
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Contact Number:</strong> ${params.contact}</p>
        
    `;
}

// Display details on page load
window.onload = displayOrderDetails;
