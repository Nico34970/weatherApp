const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=17e367df0716f851e5931c537821536c&query=' + latitude + ',' + longitude+'&limit=1'

    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Can\t connect to weather API', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently : ' + body.current.temperature + ' degrees . Feeling temperature :  '+ body.current.feelslike +' degrees. Humidity : ' + body.current.humidity)
        }
        
    })
}

module.exports = forecast