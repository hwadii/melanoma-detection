const cv = require('opencv4nodejs');
const masks = require('./masks');

const arrayOfRanges = [
  masks.lightBrown,
  masks.darkBrown,
  masks.red,
  masks.white,
  masks.blue,
  masks.black
];
let counts = [];

const main = async src => {
  let count = 0;
  let imsrc = './pictures/source/IMD092.bmp';
  let img = await cv.imreadAsync(imsrc);
  img = await img.resizeToMaxAsync(380);

  const imgGaussian = await img.gaussianBlurAsync(new cv.Size(5, 5), 0);
  const imgHSV = await imgGaussian.cvtColorAsync(cv.COLOR_BGR2HSV);
  let mask;
  arrayOfRanges.forEach(async e => {
    mask = await imgHSV.inRangeAsync(e.lowerBound, e.upperBound);
    count = 0;
    for (let i = 0; i < mask.rows; i++)
      for (let j = 0; j < mask.cols; j++) {
        if (mask.at(i, j) == 255) {
          if (i > 50 && i < 340 && j > 58 && j < 251)
            count++;
        }
      }
    console.log(`count: ${count}, color: ${e.name}`);
    cv.imshowWait('Res', mask);
    if (counts.length < 6) counts.push({ color: e.name, count: count });
    else counts = [];
  });
  // cv.imshowWait("Source", img);
};

main();

module.exports = { counts, main };
