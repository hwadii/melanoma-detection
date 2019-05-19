const cv = require('opencv4nodejs');
const masks = require('./masks');

const arrayOfRanges = [masks.lightBrown, masks.darkBrown, masks.red, masks.white, masks.blue, masks.black];
let counts = [];

const main = async (src) => {
  let count = 0;
  let imsrc = './pictures/source/IMD134.bmp';
  let img = await cv.imreadAsync(src);
  img = await img.resizeToMaxAsync(400);

  const imgGaussian = await img.gaussianBlurAsync(new cv.Size(5, 5), 0);
  const imgHSV = await imgGaussian.cvtColorAsync(cv.COLOR_BGR2HSV);
  let mask;
  arrayOfRanges.forEach(async e => {
    mask = await imgHSV.inRangeAsync(e.lowerBound, e.upperBound);
    // cv.imshowWait("Res", mask);
    count = 0;
    for (let i = 0; i < mask.rows; i++)
      for (let j = 0; j < mask.cols; j++) {
        if (mask.at(i, j) == 255) count++;
      }
    // console.log(`count: ${count}, color: ${e.name}`);
    if (counts.length > 6) counts.push({color: e.name, count: count})
    else counts = [];
  });
  // cv.imshowWait("Source", img);
};

// main();

module.exports = { counts, main };