const cv = require('opencv4nodejs');

const faceCascade = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT);
const eyeCascade = new cv.CascadeClassifier(cv.HAAR_EYE);

(async () => {
  const img = await cv.imreadAsync('./lena.png');
  const grayImg = await img.cvtColor(cv.COLOR_BGR2GRAY);

  const faces = await faceCascade.detectMultiScale(grayImg, 1.3, 5);
  faces.objects.forEach(face => {
    const faceRect = new cv.Rect(face.x, face.y, face.width, face.height);
    img.drawRectangle(faceRect, new cv.Vec3(255, 0, 0), 2);
    const roiGray = grayImg.getRegion(faceRect);
    const roiColor = img.getRegion(faceRect);
    const eyes = eyeCascade.detectMultiScale(roiGray);
    eyes.objects.forEach(eye => {
      const eyeRect = new cv.Rect(eye.x, eye.y, eye.width, eye.height);
      roiColor.drawRectangle(eyeRect, new cv.Vec3(0, 255, 0), 2);
    });
  });
  const finalImg = await cv.imwriteAsync('./out.png', img);
  console.log(finalImg);
})();
