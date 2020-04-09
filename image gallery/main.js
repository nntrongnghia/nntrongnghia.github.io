const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

function showImg(source) {
    displayedImage.setAttribute('src', source)
}

/* Looping through images */

for (let i = 1; i <= 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic'+i+'.jpg');
    thumbBar.appendChild(newImage); 
    newImage.addEventListener('click', function(){showImg(newImage.getAttribute('src'))});
}


/* Wiring up the Darken/Lighten button */
function toggleDarkLayer(){
    let className = btn.getAttribute("class");
    if(className != "dark"){
        btn.setAttribute("class", "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
    else{
        btn.setAttribute("class", "light");
        btn.textContent = "Lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    }
}

btn.addEventListener("click", toggleDarkLayer);