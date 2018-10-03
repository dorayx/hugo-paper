const elBody = document.querySelector('.js-body');
const elMenuButton = elBody.querySelector('.js-header-menu-button');
const isLink = (el) => el && el.tagName === 'A' && Boolean(el.href);
elMenuButton.addEventListener('click', (e) => {
  if (isLink(e.target)) return;
  elBody.classList.toggle('body--scrollDisabled');
  elMenuButton.classList.toggle('active');
});
