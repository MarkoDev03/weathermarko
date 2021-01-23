window.addEventListener('load', () => {

  let longitudeUser, latitudeUser;
  let temperatureText = document.querySelector('.temperature-now');
  let temperatureDescription = document.querySelector('.weather-description');
  let timezoneLocation = document.querySelector('.locationTimeZone'); 
  let temperatureField = document.querySelector('.temperature-div');
  let temperatureSpan = document.querySelector('.temperature-span');

  //get location
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        //service worker
        if ( "serviceWorker" in navigator) {
          navigator.serviceWorker.register("sw.js").then(registration =>{
            console.log("SW Registred");
            console.log(registration);
          }).catch(error => {
           console.log("SW Regstration failed");
            console.log(error);
          })
      }
         
          //set position
          position.enableHighAccuracy = true;
          longitudeUser = position.coords.longitude;
          latitudeUser = position.coords.latitude;

          //api
          const proxy = 'https://cors-anywhere.herokuapp.com/';
          const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitudeUser},${longitudeUser}`;
          
          //fetch api
          fetch(api).then(response => {
              return response.json();
        }).then(data => {
          console.log(data);  

          const {temperature, summary, icon} = data.currently;
          
          //convert celsius&farenheit
          let celsius = (temperature - 32 ) * (5/9);

          temperatureDescription.textContent = summary;
          temperatureText.textContent = Math.floor(celsius);
          timezoneLocation.textContent = data.timezone;
                    
          //set icons
          setSkyCons(icon, document.querySelector('.icon'));

         //change temperature
         temperatureField.addEventListener('click',() => {
          if(temperatureSpan.textContent === 'C') {
            temperatureSpan.textContent = 'F';
            temperatureText.textContent = temperature;
          }else {
            temperatureSpan.textContent = 'C';
            temperatureText.textContent = Math.floor(celsius);
          }
        });
        });
      
      }) ;            
  }
  //get icons
  function setSkyCons (icon, iconId) {
          const skycons = new Skycons({color:'black'}); 
          const currentIcon = icon.replace(/-/g,"_").toUpperCase();
          skycons.play();
          return skycons.set(iconId, Skycons[currentIcon]);
  }

})