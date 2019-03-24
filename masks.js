// here we define every range of color for a melanoma
// {blue, lightBrown, darkBrown, red, white, black}
// for every color: [lowerBound, upperBound]
const Vec3 = require('opencv4nodejs').Vec3;

const colors = {
  blue: [new Vec3(110, 50, 50), new Vec3(130, 255, 255)],
  lightBrown: [new Vec3(10, 100, 50), new Vec3(20, 200, 200)],
  darkbrown: [new Vec3(10, 200, 50), new Vec3(20, 255, 200)],
  red: [new Vec3(0, 70, 20), new Vec3(10, 255, 255)],
  white: [new Vec3(0, 0, 200), new Vec3(180, 255, 255)],
  black: [new Vec3(0, 0, 0), new Vec3(180, 255, 30)]
};

const masks = {
  blue: { lowerBound: colors.blue[0], upperBound: colors.blue[1] },
  lightBrown: {
    lowerBound: colors.lightBrown[0],
    upperBound: colors.lightBrown[1]
  },
  darkBrown: {
    lowerBound: colors.darkbrown[0],
    upperBound: colors.darkbrown[1]
  },
  red: { lowerBound: colors.red[0], upperBound: colors.red[1] },
  white: { lowerBound: colors.white[0], upperBound: colors.white[1] },
  black: { lowerBound: colors.black[0], upperBound: colors.black[1] }
};

module.exports = masks;
