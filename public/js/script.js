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
  const url = new URL(window.location.href);
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify({content}));
});

boldButton.addEventListener('click', () => {
  event.preventDefault();
  document.execCommand('bold', false, null);
});

italicButton.addEventListener('click', () => {
  event.preventDefault();
  document.execCommand('italic', false, null);
});

underlineButton.addEventListener('click', () => {
  event.preventDefault();
  document.execCommand('underline', false, null);
});

strikeButton.addEventListener('click', () => {
  event.preventDefault();
  document.execCommand('strikeThrough', false, null);
});

fontSelect.addEventListener('change', () => {
  document.execCommand('fontName', false, fontSelect.value);
});

sizeSelect.addEventListener('change', () => {
  document.execCommand('fontSize', false, sizeSelect.value);
});

function saveDoc(){
  var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
       "xmlns:w='urn:schemas-microsoft-com:office:word' "+
       "xmlns='http://www.w3.org/TR/REC-html40'>"+
       "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML = header+editor.innerHTML+footer;
  
  var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = window.location.pathname.replace("/", "")+'.doc';
  fileDownload.click();
  document.body.removeChild(fileDownload);
}