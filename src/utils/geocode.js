const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoieWVjNjEiLCJhIjoiY2xzcTVsMTc4MGxzcDJqcW1hdnhwMWhmdiJ9.o8jRN_W6vmOaogHsRJ0rIA&limit=1'

    request({ url , json : true } , (error , {body} ) =>  {
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback ('Unable to find location.Try another search', undefined)
        } else {
            callback (undefined , {
                latitude : body.features[0].center[1] ,
                longitude : body.features[0].center[0],
                place_name : body.features[0].place_name
            })
        }
    })
}



module.exports = geocode







//GEOCODE REQUEST
// const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/emrewhat12.json?access_token=pk.eyJ1IjoieWVjNjEiLCJhIjoiY2xzcTVsMTc4MGxzcDJqcW1hdnhwMWhmdiJ9.o8jRN_W6vmOaogHsRJ0rIA&limit=1'

// request({url : url1 , json : true } , (error,response) => {

//     if(error) {
//         console.log('No Connection internet!!')
//     } 

//     else if (response.body.features.length === 0){
//         console.log('unable to find location')
//     }
    
//    else { console.log(response.body.features[0].center)

// }})



