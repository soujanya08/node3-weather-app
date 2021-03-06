const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d584ea694732fdf5bf1332a9bcef95e9&query='+latitude+','+longitude+'&units=f'
    request({ url,json:true}, (error,{body})=>{
    if(error){
        callback("Unable to Connect to weather Service!",undefined)
    }
    else if(body.error){
        callback('Unable to find location',undefined)
    }
    else{
        callback(undefined,'The Weather is '+body.current.weather_descriptions[0]+' and the temperature is '+body.current.temperature)

    }
}
)
}
module.exports=forecast