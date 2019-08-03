const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('', (request, response) => {
  response.render('index', {
    title: 'Weather',
    name: 'Tanya'
  })
});
app.get('/help', (request, response) => {
  response.render('help', {
    title: 'help',
    name: 'Tanya',
    message: 'this page is for your help'
  })
});
app.get('/help/*', (request, response) => {
  response.render('404', {
    title: 'help',
    name: 'Tanya',
    message: 'Help article not found'
  })
});
app.get('/about', (request, response) => {
  response.render('about', {
    title: 'about',
    name: 'Tanya',
  })
});
app.get('/weather', (request, response) => {
  if (request.query.address) {
    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error) {

        return response.send({
          error: error
        })
      }
      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) {
          return response.send({
            error: forecastError
          })
        }

        response.send({
          address: request.query.address,
          location: location,
          forecast: forecastData,
        })
      })
    })

  } else {
    response.send({
      error: 'No address query'
    })
  }
});
app.get('*', (request, response) => {
  response.render('404', {
    name: 'Tanya',
    message: 'Page not found'
  })
});

app.listen(3000, () => {
  console.log("Server started on port 3000")
});