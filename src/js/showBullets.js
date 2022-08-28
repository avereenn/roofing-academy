const bulletsBtnEl = document.querySelector('.js-bullets-btn');
const bulletsEl = document.querySelector('#bullets');

function onToggleBulletsBtnClick() {
  const isExpanded = this.getAttribute('aria-expanded') === 'true' ? true : false;

  if (isExpanded) {
    bulletsEl.classList.remove('show');
    this.classList.remove('active');
    this.setAttribute('aria-label', 'показать преимущества');
    this.setAttribute('aria-expanded', 'false');
    return;
  }

  bulletsEl.classList.add('show');
  this.classList.add('active');
  this.setAttribute('aria-label', 'скрыть преимущества');
  this.setAttribute('aria-expanded', 'true');
}

bulletsBtnEl.addEventListener('click', onToggleBulletsBtnClick);
