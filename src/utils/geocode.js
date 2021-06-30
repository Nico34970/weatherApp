const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoibmljb2xhczM0OTcwIiwiYSI6ImNrcTllb2E5bjAwdWcybm1yZjd4dXo3bTkifQ.3doOgCnr3TBcXyM3n0jw-Q'
    
    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Can\t connect to geoloc API', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode