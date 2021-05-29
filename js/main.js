const navBtn = document.querySelectorAll('.scroll');
const mobileNav = document.querySelector('.mobile-menu-wrapper');
const mobileLink = document.querySelectorAll('.mobile-scroll');
const closeMenuBtn = document.querySelector('.fa-times-circle');


const handleClick = e => {
  const target = e.target;
  if (!target.closest('i').dataset.menu) return;

  document.querySelector('.menu-btn-container').classList.toggle('active');
}

const handleScroll = e => {
  const btn = e.target.dataset.btn;
  if (btn === 'choice') {
    document.querySelector('.menu-btn-container').classList.remove('active');
    scrollTo(document.querySelector('#drink-highlight'));
  } else if (btn === 'faves') {
    document.querySelector('.menu-btn-container').classList.remove('active');
    scrollTo(document.querySelector('#drink-carousel'));
  } else if (btn === 'all') {
    document.querySelector('.menu-btn-container').classList.remove('active');
    scrollTo(document.querySelector('.drink-wrapper'));
  }
}

const scrollTo = (section) => {
  section.scrollIntoView({
    behavior: "smooth"
  })
}


[mobileNav, closeMenuBtn].forEach(btn => btn.addEventListener('click', handleClick));
navBtn.forEach(btn => btn.addEventListener('click', handleScroll));
mobileLink.forEach(btn => btn.addEventListener('click', handleScroll));