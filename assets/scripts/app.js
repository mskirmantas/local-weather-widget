"use strict";

window.addEventListener("load", function() {

    // Create position variables
    let long;
    let lat;

    // Define HTML elements (to use with api data from bellow)

    let locationCity = document.querySelector('.location-city');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.darksky.net/forecast/bd9212cb900ebea89ef6013b486253c0/${lat},${long}`;
        
            // Get API information:
            fetch(api)
            .then(apiResponse =>{
                return apiResponse.json();
            })
            .then(data => {
            //console.log(data);

                // Pull required information from data (currently)
                const {temperature, summary, icon} = data.currently;

                // Show temperature in Celcius
                let tempCelcius = (temperature - 32) * (5/9);

                //Det DOM elements from API

                let cityName = data.timezone.split("/");
                locationCity.textContent = cityName[1];

                temperatureDegree.textContent = parseInt(tempCelcius, 10);

                temperatureDescription.textContent = summary;

                //Set Icon
                setIcons(icon, document.querySelector('.icon'));
            });
        });
    }

    //Assign weather icons using skycons
    function setIcons(icon, iconID) {

        //set appearance
        const skycons = new Skycons({color: "#fff"});

        // transform icon parameters to match those of Skycons (CAP_CAP)
        const currentIcon = icon.split("-").join("_").toUpperCase(); 
        // console.log(currentIcon);

        //animation
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }

});
