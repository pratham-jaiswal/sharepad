const editor = document.getElementById('editor');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton');
const underlineButton = document.getElementById('underlineButton');
const strikeButton = document.getElementById('strikeButton');
const fontSelect = document.getElementById('fontSelect');
const sizeSelect = document.getElementById('sizeSelect');
editor.focus();

boldButton.addEventListener('click', () => {
  document.execCommand('bold', false, null);
});

italicButton.addEventListener('click', () => {
  document.execCommand('italic', false, null);
});

underlineButton.addEventListener('click', () => {
  document.execCommand('underline', false, null);
});

strikeButton.addEventListener('click', () => {
  document.execCommand('strikeThrough', false, null);
});

fontSelect.addEventListener('change', () => {
  document.execCommand('fontName', false, fontSelect.value);
});

sizeSelect.addEventListener('change', () => {
  document.execCommand('fontSize', false, sizeSelect.value);
});