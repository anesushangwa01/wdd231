const requestURL = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('.cards');

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing

  const prophets = jsonObject['prophets'];

  prophets.forEach(displayProphets);
  });

 


function displayProphets(prophet) {
    // date of birth , birth place and prophet images
   const card = document.createElement('section');
   const p1 = document.createElement('p');
   const h2 = document.createElement('h2');
   const p2 = document.createElement('p');
   const image = document.createElement('img');

    h2.textContent = `${prophet.name} ${prophet.lastname}`;
    card.appendChild(h2);
    
    p1.textContent = `Date of Birth: ${prophet.birthdate}`;
    card.appendChild(p1);

    p2.textContent = `Place of birth: ${prophet.birthplace}`;
    card.appendChild(p2);
  
    image.src = prophet.imageurl;
    image.setAttribute('alt', prophet.order);
    card.appendChild(image);
  
  
    document.querySelector('div.cards').appendChild(card);
  
  }