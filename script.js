const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const navToggle = document.querySelector('#navToggle');
const hamburger = document.getElementById('navClosed');
const navIcon = document.querySelectorAll('.navIcon')
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const txtWriter = document.getElementById('text-writer');
const loader = document.getElementById('loader');
const DARK_THEME  = 'dark';
const LIGHT_THEME = 'light';



/* For caching and serviceWorker
 Make sure sw are supported */

if('serviceWorker' in navigator) {
  window.addEventListener('laod', () => {
     navigator.serviceWorker
      .register('')
  })
}

// Dark or Light Images
function imageMode(color) {
  image1.src = `img/undraw_feeling_proud_${color}.svg`
  image2.src = `img/undraw_conceptual_idea_${color}.svg`
  image3.src = `img/undraw_proud_coder_${color}.svg`
}


function toggleDarkLightMode(isDark) {
   nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' :  'rgb(255 255 255 / 50%)' ;
   navToggle.classList.toggle('filter-blue'); 
   toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
   isDark ? txtWriter.style.color = "var(--writer-night)" : txtWriter.style.color = "var(--writer-light)";
   isDark ? toggleIcon.children[1].classList.replace('icon-sun-o', 'icon-moon-o') : 
   toggleIcon.children[1].classList.replace('icon-moon-o', 'icon-sun-o');
   isDark ? imageMode(DARK_THEME) : imageMode(LIGHT_THEME);
}


// Swtich theme dynamically
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', DARK_THEME);
        localStorage.setItem('theme', DARK_THEME);
        toggleDarkLightMode(true);
    } else {
        document.documentElement.setAttribute('data-theme', LIGHT_THEME);
        localStorage.setItem('theme', LIGHT_THEME);
        toggleDarkLightMode(false);
    }
}

// Event Listeners

// add nav toogle functionality
navToggle.addEventListener("click", () => {
  nav.classList.toggle('open');
  navIcon.forEach(icon => {
    icon.classList.toggle('hidden');
  })
})

// close after clicked an anchor element, and change the icon.
nav.addEventListener("click", () => {
  if(document.body.clientWidth < 800) {
    nav.classList.toggle('open');
  }
});

// Loading Spinner
window.addEventListener('load', () => {
  loader.parentElement.removeChild(loader);
})

toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage for theme
const currentTheme = localStorage.getItem('theme');

if(currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if(currentTheme === DARK_THEME){
    toggleSwitch.checked = true;
    toggleDarkLightMode(true);
  }
 }
