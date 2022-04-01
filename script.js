'use strict'

const api = 'e07354e3f08e577986fe16d7eb9a463a'

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location')
const tempC = document.querySelector('.c')
const tempF = document.querySelector('.f')
const desc = document.querySelector('.desc')
const sunriseDOM = document.querySelector('.sunrise')
const sunsetDOM = document.querySelector('.sunset')

window.addEventListener('load', ()=>{
let lat
let long

// access geolocation of user
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        long = position.coords.longitude
        lat = position.coords.latitude

        const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`

       
        console.log(baseUrl)
        fetch(baseUrl).then((response)=>{
            return response.json()
        }).then((data) => {
            const {temp} = data.main
            const place = data.name
            const name = data.name
            const {description, icon} = data.weather[0]
            const {sunrise, sunset} = data.sys

            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            const fahrenheit = (temp * 9) / 5 + 32

            const sunriseGMT = new Date(sunrise * 1000)
            const sunsetGMT = new Date(sunset * 1000)

            iconImg.src = iconUrl

            loc.textContent =`${place}`
            desc.textContent= `${description}`
            tempC.textContent = `${temp.toFixed(2)}°C`
            tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
            sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`
            sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`


        })
        

    })
}
})