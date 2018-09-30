window.hljs.initHighlightingOnLoad();
const blocks = document.querySelectorAll('pre code');
for (let i = 0; i < blocks.length; i++) {
  window.hljs.highlightBlock(blocks[i]);
}
