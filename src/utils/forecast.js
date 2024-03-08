const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast

// WEATHER REQUEST
// const url = 'https://api.weatherstack.com/current?access_key=04c6e9577a2d919e9c71d856c75f0839&query='
// request({url: url , json : true },(error,response) =>{

//     if (error) {

//         console.log('Unable to connect to weather service!')

//     }   else if (response.body.error) {

//         console.log('unable to find location')

//     } else { console.log(response.body.current.weather_descriptions[0] + ' it is currently ' + response.body.current.temperature + ' degrees out. ' + 'It is feel like ' + response.body.current.feelslike + ' degrees out' )

//     }})

