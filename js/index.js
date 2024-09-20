
const lastmodify = "Last modified:";

let oLastModif = new Date(document.lastModified);

const text = `${ lastmodify} ${oLastModif }`;

document.getElementById("updatetime").innerHTML = text;  


const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});