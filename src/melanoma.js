const cv = require('opencv4nodejs');
const masks = require('./masks');

const arrayOfRanges = [masks.lightBrown, masks.darkBrown, masks.red, masks.white, masks.blue, masks.black];
const arrayOfImages = [2, 3, 4, 6, 8, 9, 10, 13, 14];
const main = async () => {
  let count = 0;
  let img = await cv.imreadAsync('./pictures/source/IMD045.bmp');
  img = await img.resizeToMaxAsync(400);

  const imgGaussian = await img.gaussianBlurAsync(new cv.Size(5, 5), 0);
  const imgHSV = await imgGaussian.cvtColorAsync(cv.COLOR_BGR2HSV);
  let mask;
  arrayOfRanges.forEach(async e => {
    mask = await imgHSV.inRangeAsync(e.lowerBound, e.upperBound);
    count = 0;
    for (let i = 0; i < mask.rows; i++)
      for (let j = 0; j < mask.cols; j++) {
        if (mask.at(i, j) == 255) count++;
      }
    cv.imshowWait("Res", mask);
    console.log(`count: ${count}, color: ${e.name}`);
  });
  // cv.imshowWait("Source", img);
};

const altMain = async () => {
  arrayOfImages.forEach(async im => {
    let count = 0;
    let img = await cv.imreadAsync('./pictures/source/IMD00'+im+'.bmp');
    img = await img.resizeToMaxAsync(400);

    const imgGaussian = await img.gaussianBlurAsync(new cv.Size(5, 5), 0);
    const imgHSV = await imgGaussian.cvtColorAsync(cv.COLOR_BGR2HSV);
    let mask;
    arrayOfRanges.forEach(async e => {
      mask = await imgHSV.inRangeAsync(e.lowerBound, e.upperBound);
      count = 0;
      for (let i = 0; i < mask.rows; i++)
        for (let j = 0; j < mask.cols; j++) {
          if (mask.at(i, j) == 255) count++;
        }
      // cv.imshowWait("Res", mask);
      console.log(`im: ${im}, count: ${count}, color: ${e.name}`);
    });
    cv.imshowWait("Source", img);
    console.log('\n');
  });
}

main();
// altMain();