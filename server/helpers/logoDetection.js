const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './vision_api.json'
});

const logoDetection = (req, res, next) => {
  console.log('masuk tag')
  console.log(req.file.cloudStoragePublicUrl);
  client
  .logoDetection(req.file.cloudStoragePublicUrl)
  .then(results => {
    console.log('masuk then');
      const logos = results[0].logoAnnotations;
      let arr = []
      logos.forEach(logo => {
          arr.push(logo.description)
      });
      req.body.logo = arr
      console.log(req.body.logo)
      next()
  })
  .catch(next)
}

module.exports = logoDetection
