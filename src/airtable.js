const axios = require('axios')

module.exports = axios.create({
  baseURL: 'https://api.airtable.com/v0/appmFZOp9Eo7dvzSG',
  // commbocc@gmail.com account read only api key
  headers: { Authorization: `Bearer ${process.env.VUE_APP_AIRTABLE_API_KEY}` },
})
