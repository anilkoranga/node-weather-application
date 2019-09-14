const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/dcf2144b5409cd2943ecdff67352a0b8/'+latitude+','+longitude+'?units=si'

request({url:url,json:true},(error,response)=>{
    
    if (error){
        callback('unable to connect to location services',undefined)
    }else if(response.body.error){
        callback('unable to find the location.Try another search',undefined)
    }
    
    else{
        console.log(response.body.daily.data[0])
       // callback(undefined,'The Current temp is '+response.body.currently.temperature + '  with the high temperature of   ' + response.body.daily.data[0].temperatureHigh +'  and the low tempearture of    '+ response.body.daily.data[0].temperatureLow +  '  Possibility ::  '+ response.body.daily.data[0].summary)
        callback(undefined, response.body.daily.data[0].summary+'It is currently '+response.body.currently.temperature + ' degrees out  with the high temperature of   ' + response.body.daily.data[0].temperatureHigh +'  and the low tempearture of    '+ response.body.daily.data[0].temperatureLow)
  
    }

})



}


module.exports=forecast