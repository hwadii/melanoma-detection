const cv = require('opencv4nodejs');

const lowerBound = new cv.Vec3(0, 80, 0); // light brown
const upperBound = new cv.Vec3(15, 255, 255); // dark brown
// const lowerBound2 = new cv.Vec3()

const kernelOpen = new cv.getStructuringElement(
  cv.MORPH_ELLIPSE,
  new cv.Size(7, 7)
);

const kernelClose = new cv.getStructuringElement(
  cv.MORPH_ELLIPSE,
  new cv.Size(20, 20)
);

(async () => {
  let img = await cv.imreadAsync('./melanoma3.bmp');
  img = await img.resizeToMaxAsync(400);
  // img = await img.gaussianBlurAsync(new cv.Size(5,5), 0);

  // hsv
  const imgHSV = await img.cvtColorAsync(cv.COLOR_BGR2HSV);

  // mask
  const mask = await imgHSV.inRangeAsync(lowerBound, upperBound);
  // const mask2 = 

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
  console.log(conts);
  // console.log(conts);
  img.drawContours(conts, new cv.Vec3(255, 0, 0));

  conts.forEach((cont, i) => {
    const rect = cont.boundingRect();
    img.drawRectangle(
      new cv.Point2(rect.x, rect.y),
      new cv.Point2(rect.x + rect.width, rect.y + rect.height),
      new cv.Vec3(0, 0, 255),
      1
    );
    console.log(rect.width);
    img.putText("1", new cv.Point2(rect.x, rect.y + rect.h), cv.FONT_HERSHEY_SIMPLEX, 1, new cv.Vec3(0, 255, 0));
  });

  cv.imshowWait('mask', mask);
  // cv.imshowWait('real', img);
  // cv.imshowWait('final', img);
  cv.imshowWait('maskOpen', maskOpen);
  cv.imshowWait('maskClose', maskClose);
  cv.imshowWait('final', img);
  // await cv.imwriteAsync('./maskClose.bmp', maskClose);
  // cv.imshowWait('maskFinal', maskFinal);
})();
