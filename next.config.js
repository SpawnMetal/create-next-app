require('dotenv').config()

module.exports = {
  env: {
    // API_URL: 'http://localhost:4200',
    API_URL: process.env.API_URL,
  },
}
