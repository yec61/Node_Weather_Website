const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express Config
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index' , {
        title : 'Weather ' ,
        name :'Emre Cebeci'
    })
})

app.get('/about', (req , res) => {
        res.render('about',{
            title : 'About me',
            name: 'Emre Cebeci'
        })
})

app.get('/help', (req , res) => {
    res.render('help' , {
        help_text : 'This is some helpful text',
        title : 'Help' ,
        name:'Emre Cebeci'
    })
})

app.get('/weather' , (req,res) => {
   
    if(!req.query.adress) {
        return res.send({
            error:'Adress must be provided !'
        })
    }
    
    geocode(req.query.adress , (error,{latitude , longitude , place_name}= {})=>{
        if (error) {
            return res.send({error})
        }

    forecast(latitude,longitude, (error , forecastData)=> {
        if (error) {
            return res.send({error})
        } 

    res.send({
        forecast : forecastData ,
        location : place_name ,
        adress: req.query.adress

    })
    })
    })
    
    //   res.send({
    //     adress: req.query.adress ,
    //     forecast : 'Hava Durumu' ,
    //     location : 'Istanbul'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term!'
        })

    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req ,res) => {
    res.render('404', {
        error: 'Help article not found !'
    })
})

app.get('*', (req ,res)=> {
    res.render('404' , {
        title: '404',
        error: '404 not found !'
    }) 
})

app.listen(port, ()=> {
    console.log('server is up on port 3000.' + port)
})