const axios = require('axios');

  const WikiController = (req, res, next) => {
    console.log(Object.values(req.body))
    axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${req.body.logo[0]}`)
    .then(({ data }) => {
      req.body.desc = `${Object.values(data.query.pages)[0].extract.slice(0,250)}...`
      next()
    })
    .catch(next)
  }

  module.exports = WikiController