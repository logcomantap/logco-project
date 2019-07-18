const axios = require('axios');

class WikiController {
  static getDesc(req, res, next) {
    console.log(Object.values(req.body))
    axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${Object.values(req.body)[0]}`)
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = WikiController