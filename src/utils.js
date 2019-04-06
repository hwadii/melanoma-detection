const Vec3 = require('opencv4nodejs').Vec3;
// utilities function

// convert general hsv into opencv's hsv

const hsv = (h, s, v) => {
  const cvH = h / 2;
  const cvS = (s * 255) / 100;
  const cvV = (v * 255) / 100;
  return new Vec3(cvH, cvS, cvV);
};

module.exports = hsv;
