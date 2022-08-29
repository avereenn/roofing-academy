const feedbackLinkEl = document.querySelector('.js-feedback-link');
const feedbackFormEl = document.querySelector('.js-feedback-form');
const formCloseEl = document.querySelector('.js-form-close');
const feedbackInputEl = document.querySelector('.js-feedback-input');
const submitPopupEl = document.querySelector('.js-submit-popup');
const popupTextEl = document.querySelector('.js-popup-text');
const popupCloseEl = document.querySelector('.js-popup-close');
const validation = new JustValidate('.js-feedback-form');
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
let isFormValid = false;

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
  ])
  .onFail(() => isFormValid = false)
  .onSuccess(() => isFormValid = true);

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

feedbackFormEl.addEventListener('submit', function (ev) {
  ev.preventDefault();
  if(!isFormValid) return;

  feedbackFormEl.classList.remove('show');
  feedbackLinkEl.setAttribute('aria-expanded', 'false');

  /*
   * try {
   * // отправляем заявку
   * } catch(err) {
   * // обрабатываем ошибку, сообщаем пользователю об ошибке
   * popupTextEl.textContent = 'Что-то пошло не так...';
   * submitPopupEl.classList.add('show', 'danger');
   * setTimeout(() => submitPopupEl.classList.remove('show'), 2000);
   * return;
   * }
   */

  popupTextEl.textContent = 'Спасибо! Ваша заявка отправлена';
  submitPopupEl.classList.add('show', 'success');
  const timerID = setTimeout(() => submitPopupEl.classList.remove('show'), 2000);

  popupCloseEl.addEventListener('click', () => {
    clearTimeout(timerID);
    submitPopupEl.classList.remove('show');
  });

  feedbackFormEl.reset();
});
