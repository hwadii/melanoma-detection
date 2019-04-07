const cv = require('opencv4nodejs');
const masks = require('./masks');

const kernelOpen = new cv.getStructuringElement(
  cv.MORPH_ELLIPSE,
  new cv.Size(7, 7)
);

const kernelClose = new cv.getStructuringElement(
  cv.MORPH_ELLIPSE,
  new cv.Size(20, 20)
);

const drawRectContours = async (conts, img) => {
  conts.forEach((cont, i) => {
    const rect = cont.boundingRect();
    img.drawRectangle(
      new cv.Point2(rect.x, rect.y),
      new cv.Point2(rect.x + rect.width, rect.y + rect.height),
      new cv.Vec3(0, 0, 255),
      1
    );
  });
};

const main = async () => {
  let img = await cv.imreadAsync('./pictures/source/IMD381.bmp');
  img = await img.resizeToMaxAsync(400);

  // gaussian blur
  const imgGaussian = await img.gaussianBlurAsync(new cv.Size(55, 55), 0);

  // gray
  let imgGray = await imgGaussian.cvtColorAsync(cv.COLOR_BGR2GRAY);

  // threshold
  imgGray = await imgGray.thresholdAsync(120, 255, cv.THRESH_BINARY_INV);

  // hsv
  const imgHSV = await imgGaussian.cvtColorAsync(cv.COLOR_BGR2HSV);

  // mask
  const mask = await imgHSV.inRangeAsync(
    masks.lightBrown.lowerBound,
    masks.lightBrown.upperBound
  );

  // morphology
  const maskOpen = await mask.morphologyExAsync(kernelOpen, cv.MORPH_OPEN);
  const maskClose = await maskOpen.morphologyExAsync(
    kernelClose,
    cv.MORPH_CLOSE
  );

  let maskFinal = maskClose;
  maskFinal = await maskFinal.copyAsync();

  const conts = await maskFinal.findContoursAsync(
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_NONE
  );

  img.drawContours(conts, new cv.Vec3(255, 0, 0));

  await drawRectContours(conts, img);

  cv.imshowWait('mask', mask);
  // cv.imshowWait('thres', imgGray);
  cv.imshowWait('final', img);
};

// main();

module.exports = { kernelClose };
