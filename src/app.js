const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(__filename)

// console.log(express)

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(app)
//Setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Smeet Thakkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Smeet Thakkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Smeet Thakkar',
        helperText: 'Some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please add a valid address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location: req.query.address,
    //     temperature: 31,
    //     forecast: 'Raining'
    // })
})

app.get('/products', (req, res) => {
    if(!req.query) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    // console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Smeet Thakkar',
        errorMessage: 'Help Article Not Found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Smeet Thakkar',
        errorMessage: 'Page not found'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello Express')
// })

// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Us</h1>')
// })

// app.listen(3000, () => {
//     console.log('Server is up on Port 3000')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})