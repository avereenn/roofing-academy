const burgerEl = document.querySelector('.js-burger');
const menuEl = document.querySelector('.js-menu');

function onToggleMenuBtnClick() {
  const isExpanded = this.getAttribute('aria-expanded') === 'true' ? true : false;

  if (isExpanded) {
    menuEl.classList.remove('show');
    this.classList.remove('active');
    this.setAttribute('aria-label', 'открыть меню');
    this.setAttribute('aria-expanded', 'false');
    return;
  }

  menuEl.classList.add('show');
  this.classList.add('active');
  this.setAttribute('aria-label', 'закрыть меню');
  this.setAttribute('aria-expanded', 'true');
}

burgerEl.addEventListener('click', onToggleMenuBtnClick);
