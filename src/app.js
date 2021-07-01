const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, ('../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up HandleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Hello express</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nicolas 0'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nicolas 1'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Nicolas 2',
        helpText: 'An help text'
    })
})


app.get('/weatherNew', (req, res) => {
    if (!req.query.address) {
        res.render('weather', {
            error: 'Address paramater is missing',
            title: 'Weather',
            name: 'Nicolas 0',
        })
    }
    

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            // return res.send([{
            //     error
            // }])
            res.render('weather', {
                error,
                title: 'Weather',
                name: 'Nicolas 0',
            })
        } 

        forecast( latitude, longitude, (error, forecastData) => {
            
            if (error) {
                res.render('weather', {
                    title: 'Weather',
                    name: 'Nicolas 0',
                    error
                })
            } else {
                res.render('weather', {
                    address: req.query.address,
                    forecast: forecastData,
                    location,
                    title: 'Weather',
                    name: 'Nicolas 0',
                    error
                })
            }
        })
    })


})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address paramater is missing'
        })
    }
    

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 

        forecast( latitude, longitude, (error, forecastData) => {
            
            if (error) {
                return res.send({
                    error
                })
            } 

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location,

            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send([{
            error: 'Search missing'
        }])
    }
    console.log(req.query)
    res.send([{
        products: []
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicolas 3',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicolas 4',
        errorMessage: 'Page not found'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

