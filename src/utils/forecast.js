const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=57030d87241b5861e224f9dd4e87fc9c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + ' throughout the day.' + 
                ' It is currently ' + body.current.temperature + ' degrees outside '
                + ' but it feels like ' + body.current.feelslike + ' degrees.'
                // desc: body.current.weather_descriptions[0],
                // temperature: body.current.temperature
            )
        }
    })
}

module.exports = forecast