const melanoma = document.getElementById('melanoma');
const resId = document.getElementById('res');

(async () => {
  const res = await fetch('/stuff');
  const kernelClose = await res.json();
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