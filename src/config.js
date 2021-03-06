require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Autolib',
    description: 'Louer la voiture dont vous avez envie.',
    meta: {
      charSet: 'utf-8',
      property: {
      }
    }
  },
  locale: 'fr',
  locales: ['en', 'fr']
}, environment);
