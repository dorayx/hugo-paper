(function () {
  'use strict';

  var elBody = document.querySelector('.js-body');
  var elMenuButton = elBody.querySelector('.js-header-menu-button');

  var isLink = function isLink(el) {
    return el && el.tagName === 'A' && Boolean(el.href);
  };

  elMenuButton.addEventListener('click', function (e) {
    if (isLink(e.target)) return;
    elBody.classList.toggle('body--scrollDisabled');
    elMenuButton.classList.toggle('active');
  });

}());
