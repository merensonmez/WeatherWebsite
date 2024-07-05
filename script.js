
//making object of weatherapi
const weatherApi = {
    key: 'e36a7f47666cb23943e496bf497db0f1',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}


let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})


function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  
        .then(weather => {  
            return weather.json(); 
        }).then(showWeaterReport);  

}

function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==='404'){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{

    // console.log(weather.cod);
    // console.log(weather);  
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent=document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}%  <br> Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
    }
}


function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}


function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    
    return `${date} ${month} (${day}) , ${year}`
}

function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(https://t4.ftcdn.net/jpg/01/44/41/05/360_F_144410558_ndu3FNm3NtZDh9ME7lqSun4iJMkMsN1V.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(https://st2.depositphotos.com/4285567/48120/i/450/depositphotos_481200244-stock-photo-night-rain-drops-fall-wet.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(https://media.istockphoto.com/id/1430537932/photo/blue-sky-with-white-clouds.webp?b=1&s=170667a&w=0&k=20&c=h9jXcgHg0keOp2OnI-hkJhsAEAEewKNediKrg-s97a8=)';
    }
    else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(https://t3.ftcdn.net/jpg/01/25/33/12/360_F_125331224_N2oIrUEgN5uUy8MntdH4y4dFqm8mrKR5.jpg)';
    }
    else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(https://wallpapers.com/images/featured/sunny-i2iuwt6dckyhzjmi.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(https://img.freepik.com/premium-photo/drizzle-rainy-night-light-bokeh-background-wallpaper_1000174-3357.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(https://t3.ftcdn.net/jpg/06/86/21/92/360_F_686219293_oZYWOBpbwnXUBzratocdJhGnkH8RBgry.jpg)';
    }

    else {
        document.body.style.backgroundImage = 'url(https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?cs=srgb&dl=pexels-jplenio-1118873.jpg&fm=jpg)';
    }
}

function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function myFunction () {
    if(window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    }else{
        navbar.classList.remove("sticky");
    }
}