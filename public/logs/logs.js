var map = L.map('map').setView([0.0, 0.0], 1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var mapContainer = document.getElementById('map');
mapContainer.style.height = window.innerHeight + 'px';

window.addEventListener('resize', function() {
    mapContainer.style.height = window.innerHeight + 'px';
    map.invalidateSize();
  });

getData(); 
async function getData() {
    const response = await fetch('/api');
    const data=await response.json();
    for(item of data){
        const marker=L.marker([item.lat, item.lon]).addTo(map);
         const txt=`${item.city} city with latitude :${item.lat}&deg;,
         and longitude :${item.lon}&deg; The weather here is ${item.weather.humidity}% humid
          with a temperature of ${item.weather.temp}°C`;
          marker.bindPopup(txt)
    //     const roots=document.createElement('p');
    //     const name=document.createElement('div');
    //     const geo=document.createElement('div');
    //     const date=document.createElement('div');
    //     const image=document.createElement('img');
       
    //     name.textContent= `name:${item.name}`;
    //     geo.textContent= `${item.lat},${item.lon}`;
    //     const datestring =new Date(item.timestamp).toLocaleString();
    //     date.textContent=datestring;
    //    image.src=item.image64;
    //     roots.append(name,geo,date,image);
    //     document.body.append(roots);
    }
  
    console.log(data);
} 