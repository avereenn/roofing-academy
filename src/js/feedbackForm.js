const feedbackLinkEl = document.querySelector('.js-feedback-link');
const feedbackFormEl = document.querySelector('.js-feedback-form');
const formCloseEl = document.querySelector('.js-form-close');
const feedbackInputEl = document.querySelector('.js-feedback-input');
const validation = new JustValidate('.js-feedback-form');
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};

IMask(feedbackInputEl, maskOptions);

validation.addField('#policy-confirm', [
  {
    rule: 'required',
    errorMessage: 'Это поле обязательно',
  }
])
.addField('#phone-number', [
  {
    rule: 'required',
    errorMessage: 'Пожалуйста, введите номер телефона',
  }
]);

function onToggleFeedbackFormLinkClick(ev) {
  ev.preventDefault();

  const isExpanded = feedbackLinkEl.getAttribute('aria-expanded') === 'true' ? true : false;

  if (isExpanded) {
    feedbackFormEl.classList.remove('show');
    feedbackLinkEl.setAttribute('aria-expanded', 'false');
    return;
  }

  feedbackFormEl.classList.add('show');
  feedbackLinkEl.setAttribute('aria-expanded', 'true');
}

function onCloseFeebackFormClick(ev) {
  if (
    !ev.target.classList.contains('js-feedback-link') &&
    !ev.target.closest('.js-feedback-form') ||
    ev.target.closest('.js-form-close')
  ) {
    feedbackFormEl.classList.remove('show');
    feedbackLinkEl.setAttribute('aria-expanded', 'false');
  }
}

feedbackLinkEl.addEventListener('click', onToggleFeedbackFormLinkClick);
window.addEventListener('click', onCloseFeebackFormClick);
