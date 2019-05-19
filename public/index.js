const melanoma = document.getElementById('melanoma');
const resId = document.getElementById('res');
const red = document.getElementById('red');
const lb = document.getElementById('lb');
const db = document.getElementById('db');
const b = document.getElementById('b');
const white = document.getElementById('white');
const bl = document.getElementById('bl');

(async () => {
  const res = await fetch('/stuff');
  const stats = await res.json();
})();

const handleFile = files => {
  const img = new Image();
  img.src = URL.createObjectURL(files[0]);
  img.onload = () => {
    const canvas = document.getElementById('img');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
  }
}