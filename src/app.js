const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
    title:'Weather app',
    name:'Saikiran'
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Saikiran'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Saikiran'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
      
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
    
            res.send({location,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage:"Help article not found",
        name:'Saikiran'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage:"Page not found",
        name:'Saikiran'
    })
})



app.listen(port,()=>{
    console.log('Server is up on port '+port)
})