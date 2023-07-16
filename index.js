const express = require('express');
const bodyParser = require('body-parser');
import('node-fetch').then(fetch => {
    // Your code that uses fetch goes here
  }).catch(err => {
    // Handle any errors that occur during the import
    console.error('Failed to import node-fetch:', err);
  });
const Datastore = require('nedb');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(3000,()=> console.log('listening on port 3000'));
app.use(express.static('public'));
app.use(express.json());

const database=new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request, response)=>{
    database.find({},(err,data)=>{
        if(err){
            response.end();
            return; 
        }

    response.json(data); 
    });
});   
app.post('/api',(request, response)=>{
    console.log('I got a request');
    const data = request.body;
    const timestamp=Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});  
app.get('/weather/:latlon',async(request, response)=>{
    const latlon=request.params.latlon.split(',');
    console.log(latlon);
    const lat=latlon[0];
    const lon=latlon[1];
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a5b224567a363b58eca3038726c5613f&units=metric`;
const fetch_response = await fetch(url);
const data= await fetch_response.json();
    response.json(data);
});
  
app.get('/geo/:city',async(request, response)=>{
    //console.log(city);
    const city = request.params.city;
    console.log(city);
    const apiKey = '06ef339581434d5b9a675c9e25bdef35';  
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
    const fetch_response = await fetch(url);
    const data= await fetch_response.json();
    response.json(data);
});