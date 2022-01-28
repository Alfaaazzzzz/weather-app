const request= require('request')

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWxmYWFhenp6enoiLCJhIjoiY2t5dmUzeGluMXd1NzJwcHRwaGRmZzl0aSJ9.ZmgDX3z5Ok-5WKF-7gwMGQ&limit=1'

    request({url,json:true},(err,{body})=>{
        if (err){
            callback('Unable to connect to location services😣😣!!',undefined)
        }else if(body.features.length===0){
            callback('Oops unable to find the location😣😣!!',undefined)
        }else{
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode