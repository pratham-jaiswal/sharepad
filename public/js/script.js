const editor = document.getElementById('editor');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton');
const underlineButton = document.getElementById('underlineButton');
const strikeButton = document.getElementById('strikeButton');
const fontSelect = document.getElementById('fontSelect');
const sizeSelect = document.getElementById('sizeSelect');
editor.focus();

editor.addEventListener('input', () => {
  const content = editor.innerHTML;
  const noteId = '<%= note._id %>';
  const url = `/notes/${noteId}`;
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({content}));
});

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