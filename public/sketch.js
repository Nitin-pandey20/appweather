       asyncCall();
        async function asyncCall() { 
        const button = document.getElementById('button');        
         button.addEventListener('click', async event=>{   
            const city=document.getElementById('city').value;
            
            const url1=`/geo/${city}`;
        const response1 = await fetch(url1);
        const data1= await response1.json();
        const weather1 =data1.results;
   const lat=document.getElementById('lat').textContent=data1.results[0].geometry.lat;
   const lon=document.getElementById('lon').textContent=weather1[0].geometry.lng;        
       const url=`/weather/${lat},${lon}`;
            const response = await fetch(url);
            const data= await response.json();
            const weather =data.main;
       document.getElementById('humidity').textContent=data.main.humidity;
       document.getElementById('temp').textContent=data.main.temp;        
    //    console.log(data);  
    // console.log(city); 
                      
        
        const reqdata={lat,lon,city,weather};
               const options={
               method: 'POST',
               headers:{
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(reqdata)
           }; 
             const reqresponse= await fetch('/api',options);
            const json =await reqresponse.json();
            console.log(json);
   }) 
    }