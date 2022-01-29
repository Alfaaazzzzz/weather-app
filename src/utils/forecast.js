
const request = require("request")

const forecast=(longitude,latitude,callback)=>{
  const url='http://api.weatherstack.com/current?access_key=67f35b4cd3cd7dd3029e30f06f315908&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +''

  request({url,json:true},(err,{body})=>{
    if(err){
      callback('Unable to connect to weather service😢',undefined)
    }else if(body.error){
      callback('unable to find location🤔🤔!',undefined)
    }else{
      callback(undefined,`${body.current.weather_descriptions}.
       It is currently ${body.current.temperature} degree Celsius out, It feels like ${body.current.feelslike} degree Celsius out. ohh! It's ${body.current.humidity}% humidity `)
    }
  })
}

module.exports= forecast