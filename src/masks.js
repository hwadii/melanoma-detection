// here we define every range of color for a melanoma
// {blue, lightBrown, darkBrown, red, white, black}
// for every color: [lowerBound, upperBound]
const Vec3 = require('opencv4nodejs').Vec3;

const colors = {
  red: [new Vec3(0, 90, 84), new Vec3(2, 255, 255)],
  darkbrown: [new Vec3(2, 90, 80), new Vec3(10, 160, 151)],
  lightBrown: [new Vec3(10, 115, 85), new Vec3(15, 255, 255)],
  blue: [new Vec3(100, 0, 0), new Vec3(140, 50, 180)],
  white: [new Vec3(0, 0, 255), new Vec3(180, 50, 255)],
  black: [new Vec3(0, 108, 69), new Vec3(10, 255, 160)]
};

const masks = {
  blue: {
    lowerBound: colors.blue[0],
    upperBound: colors.blue[1],
    name: 'blue'
  },
  lightBrown: {
    lowerBound: colors.lightBrown[0],
    upperBound: colors.lightBrown[1],
    name: 'light brown'
  },
  darkBrown: {
    lowerBound: colors.darkbrown[0],
    upperBound: colors.darkbrown[1],
    name: 'dark brown'
  },
  red: { lowerBound: colors.red[0], upperBound: colors.red[1], name: 'red' },
  white: {
    lowerBound: colors.white[0],
    upperBound: colors.white[1],
    name: 'white'
  },
  black: {
    lowerBound: colors.black[0],
    upperBound: colors.black[1],
    name: 'black'
  }
};

module.exports = masks;
