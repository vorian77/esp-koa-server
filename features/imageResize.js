const sharp = require("sharp");

module.exports.imgProperties = async function(ctx) {
  const { imgFile } = ctx.query;
  const metadata = await sharp(imgFile).metadata();
  console.log(metadata);
  ctx.body = metadata;
};

module.exports.imgResize = async function(ctx) {
  const { imgFileIn, imgFileOut, resizeWidth } = ctx.query;
  const resizeParms = { width: parseInt(resizeWidth) };
  
  try {
    const response = await sharp(imgFileIn)
      .resize(resizeParms)
      .toFile(imgFileOut);
    console.log(response);
    ctx.body = response;  
  } catch (err) {
    console.error(err);
  }
};
