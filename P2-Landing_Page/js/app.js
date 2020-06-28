let sectionListTag = document.querySelectorAll('section');
let navTag = document.getElementById('navbar');
let sectionLen = sectionListTag.length;
let sectionArray = [];
let oldPosition = 0;
let currentPosition = 0;


function scrollToSection(sectionID) {
  window.scrollTo(0, sectionID);
}



// build the nav bar
sectionListTag.forEach((element, index) => {
  let sectionName = element.getAttribute('data-nav');
  let toOffSection = element.offsetTop + 30;
  let liTag = document.createElement('li');
  liTag.setAttribute('class', 'navBar_link' + index);
  liTag.innerHTML = `<a onClick="scrollToSection(${toOffSection})">${sectionName}</a>`;
  navTag.appendChild(liTag);
});



document.addEventListener('scroll', () => {
  currentPosition = this.scrollY;
  // Section Positions
  sectionArray = [];
  sectionListTag.forEach(element =>
    sectionArray.push(element.getBoundingClientRect().top + 50)
  );

  // Adding and removing active sections
  let addIndex = sectionArray.findIndex(element => element > 0);
  for (let i = 0; i < sectionLen; i++) {
    if (addIndex === i) {
      document.querySelector('.navBar_link' + addIndex).classList.add('active');
      document
        .querySelector(`#section${addIndex + 1}`)
        .classList.add('active_class');
    } else {
      document.querySelector('.navBar_link' + i).classList.remove('active');
      document.querySelector(`#section${i + 1}`).removeAttribute('class');
    }
  }
});
