(function () {
  'use strict';

  window.hljs.initHighlightingOnLoad();
  var blocks = document.querySelectorAll('pre code');

  for (var i = 0; i < blocks.length; i++) {
    window.hljs.highlightBlock(blocks[i]);
  }

}());
