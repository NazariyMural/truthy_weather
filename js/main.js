//Будемо надчилати GET запит. 
$(document).ready(function () {
    $.getJSON('./data/current.city.list.json', function (data) {
        function currentCity(){
            let out = '';
            for (let key in data) {
                if (data[key].id == $('select option:selected').attr('data-city')) {
                    // console.log($('select option:selected').data());
                    // out += `<p data-city="${data[key].id}">${data[key].name}</p>`;
                    $.get( //Відправляємо GET запит на сервак з усією потрібною інформацією і отримуємо обєкт погоди
                        "https://api.openweathermap.org/data/2.5/weather",
                        {
                            "id": $('select option:selected').attr('data-city'), //ідинтифікатор міста Лева
                            "appid": "47fb3882d09a3eb3c5a020c7c8f3e57a"
                        },
                        function (data) {
                            //старе форматування
                            let checkIcon = foo(data);
                            let outTime = checkDate();
                            checkViewImage(data);
                            checkViewBack(data);
                            checkMoon(data);

                            // let out = '';
                            // console.log(data);
                            // out += `<div class="wether-wrap">`
                            // out += `<p class="data">${outTime}</p>`
                            // // out += `<dic class="ico-wether"><i class="wi ${checkIcon}"></i></div>`;
                            // out += `<dic class="ico-wether"><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>`;
                            // out += `<p class="temp">Температура: <b>${Math.round(data.main.temp - 273)}<i class="wi wi-celsius"></i></b></p>`;
                            // out += `<p class="humidity">Вологість повітря: <b>${data.main.humidity}%</b></p>`;
                            // out += `<p class="pressure">Тиск, мм.рт.ст: <b>${Math.round(data.main.pressure * 0.00750003755419211 * 100)}</b></p>`;
                            // out += `<p class="wind">Швидкість вітру, м/с: <b>${data.wind.speed}</b></p>`;
                            // out += `<p class="wind"></p>`
                            // out += `</div>`
                            // $('#root').html(out);

                            //Нове форматування списку який справа
                            $('.wather_item_wind').html(`${data.wind.speed} м/с`);
                            $('.wather_item_humidity').html(`${data.main.humidity}%`);
                            $('.wather_item_visibility').html(`${data.visibility/1000} км`);
                            $('.wather_item_pressure').html(`${Math.round(data.main.pressure * 0.00750003755419211 * 100)} мм.рт.ст`);
                            
                             //Нове форматування панелі зліва
                             $('.wether_penal_title').html(`${data.name}, Україна`);
                             $('.wether_penal_subtitle').html(`${outTime}`);
                             $('.wether_penal_temp').html(`${Math.round(data.main.temp - 273)}&#176`);
                             $('.wether_penal_desc').html(`${checkIcon}`);
                             $('.wether_penal_fell').html(`відчувається як ${Math.round(data.main.temp_min - 273)}&#176`);
                             $('.wether_penal_min').html(`МАКС ${Math.round(data.main.temp_max - 273)}&#176 МІН ${Math.round(data.main.temp_min - 273)}&#176`);
                             $('.wether_penal_icon').html(`<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`);
                             
                             //оформлення header
                             $('.nav_icon_weather').attr("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
                             $('.location_text').html(`${Math.round(data.main.temp - 273)}&#176 ${data.name}, Україна`);
                        }
                    );
                }
            }
        }
        currentCity();
        
        $('select').on('change', function () {
            currentCity();
            forcastByFiveDays();
        })
        function forcastByFiveDays(){
            let out = '';
            for (let key in data) {
                if (data[key].id == $('select option:selected').attr('data-city')) {

                    $.get(
                        "https://api.openweathermap.org/data/2.5/forecast?",
                        {
                            "id": $('select option:selected').attr('data-city'),
                            "appid": "47fb3882d09a3eb3c5a020c7c8f3e57a"
                        },
                        function (data) {
                            //На сьогодні 18.00
                            $('.period_of_forcast.in_3_h').html(`Сьогодні <br>${data.list[1].dt_txt.slice(11, -3)}`);
                            $('.wether_forcast_desc.in_3_h').html(`${data.list[1].weather[0].description}`);
                            $('.forcast_icon.in_3_h').html(`<img src="https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png">`);
                            $('.forcast_temp.in_3_h').html(`${Math.round(data.list[1].main.temp - 273)}&#176`);
                            $('.forcast_humidity.in_3_h').html(`${data.list[1].main.humidity}%`);

                            //На завтра о 9,00
                            $('.period_of_forcast.tomorrow_day').html(`Завтра <br>${data.list[6].dt_txt.slice(11, -3)}`);
                            $('.wether_forcast_desc.tomorrow_day').html(`${data.list[6].weather[0].description}`);
                            $('.forcast_icon.tomorrow_day').html(`<img src="https://openweathermap.org/img/w/${data.list[6].weather[0].icon}.png">`);
                            $('.forcast_temp.tomorrow_day').html(`${Math.round(data.list[6].main.temp - 273)}&#176`);
                            $('.forcast_humidity.tomorrow_day').html(`${data.list[6].main.humidity}%`);


                            //На завтра о 21.00
                            $('.period_of_forcast.tomorrow_evening').html(`Завтра <br>${data.list[9].dt_txt.slice(11, -3)}`);
                            $('.wether_forcast_desc.tomorrow_evening').html(`${data.list[9].weather[0].description}`);
                            $('.forcast_icon.tomorrow_evening').html(`<img src="https://openweathermap.org/img/w/${data.list[9].weather[0].icon}.png">`);
                            $('.forcast_temp.tomorrow_evening').html(`${Math.round(data.list[9].main.temp - 273)}&#176`);
                            $('.forcast_humidity.tomorrow_evening').html(`${data.list[9].main.humidity}%`);

                            //Після завтра в обід
                            $('.period_of_forcast.day_after_tomorrow_day').html(`Післязавтра в<br> обід`);
                            $('.wether_forcast_desc.day_after_tomorrow_day').html(`${data.list[16].weather[0].description}`);
                            $('.forcast_icon.day_after_tomorrow_day').html(`<img src="https://openweathermap.org/img/w/${data.list[16].weather[0].icon}.png">`);
                            $('.forcast_temp.day_after_tomorrow_day').html(`${Math.round(data.list[16].main.temp - 273)}&#176`);
                            $('.forcast_humidity.day_after_tomorrow_day').html(`${data.list[16].main.humidity}%`);

                            //через 5 днів
                            $('.period_of_forcast.in_five').html(`Станом на ${data.list[39].dt_txt.slice(8, -9)}/${data.list[39].dt_txt.slice(5, -12)}/${data.list[39].dt_txt.slice(0, -15)}`);
                            $('.wether_forcast_desc.in_five').html(`${data.list[39].weather[0].description}`);
                            $('.forcast_icon.in_five').html(`<img src="https://openweathermap.org/img/w/${data.list[39].weather[0].icon}.png">`);
                            $('.forcast_temp.in_five').html(`${Math.round(data.list[39].main.temp - 273)}&#176`);
                            $('.forcast_humidity.in_five').html(`${data.list[39].main.humidity}%`);
                        }
                    );
                }
            }
        }
        forcastByFiveDays();
    })

    function foo(data) {
        let foo = data;
        let temp = Math.round(foo.main.temp - 273);
        let clouds = foo.clouds.all;
        let descFromServer = foo.weather[0].description;
        
        let description = '';
        if(descFromServer === 'mist'){
            description += "Туманно"
        }
        else if(descFromServer === 'light intensity shower rain'){
            description += "Невеликий дощ"
        }
        if (temp > 15 && clouds > 40) {
            description += " Хмарно з проясненнями";
        }
        else if (temp > 15 && clouds < 40) {
            description += " Сонячно";
        }
        else if (temp < 10 && clouds > 39) {
            description += " Хмарно";
        }
        else if (temp < 10 && clouds < 40) {
            description += " Безхмарно";
        }
        // else if()
        return description;
    };

    function checkDate() {
        let outTime = '';
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        outTime=`станом на ${hours}:${minutes} GMT+0200`
        return outTime;
    }

    function checkViewBack(data) {
        let foo = data;
        let cloudsServ = foo.clouds.all;
        let hours = new Date().getHours();
        let descFromServer = foo.weather[0].description;

        let cloud_reg1 = $('.cloud_reg1');
        let cloud_reg = $('.cloud_reg');
        
        let rainCloud = "url('./img/rain.svg')";
        let rainStrong = "url('./img/rain_strong_black.svg')";
       
        let sunny = "url('./img/sun.svg')";

        let cloud = "url('./img/just_cloud.svg')";
        let bigCloud = "url('./img/big_cloud.svg')"; 

        let snow = "url('./img/snow_cloud.svg')";
        let snowBig = "url('./img/snowyyy.svg')";
        

        if(descFromServer.indexOf('rain')!==-1){
            cloud_reg1.css("background-image", rainCloud);
            console.log("rain");
        }

        else if(descFromServer.indexOf('snow')!==-1){
            cloud_reg1.css({
                "background-image": snow
            });
            cloud_reg.css({
                "background-image": snowBig
            })
            console.log("snow");
        }

        else if(descFromServer.indexOf('light')!==-1 || descFromServer.indexOf('sun')!==-1){
            cloud_reg1.css({
                "background-image": 'none'
            });
            cloud_reg.css({
                "background-image": sunny
            })
            console.log("sunny");
        }
        
        else if(cloudsServ > 70){
            cloud_reg1.css({
                "background-image": cloud
            });
            cloud_reg.css({
                "background-image": bigCloud
            });
            console.log("cloudy");
        }
        else{
            cloud_reg1.css({
                "background-image": cloud
            });
            cloud_reg.css({
                "background-image": bigCloud
            });
            console.log("nothing");
        }
    }
    function checkViewImage(data){
        let hours = new Date().getHours();
        let pan_bg = $('.wether_penal');
        let cloudsServ = data.clouds.all;

        let nigth_clear = "url('./img/bg/night-clear.jpg')";
        let morning = "url('./img/bg/morning.jpg')";
        let day = "url('./img/bg/day.jpg')";
        let evening_cloud_middle = "url('./img/variable_icon/clouds_day.jpg')";

        if(hours > 6 && hours < 12){
            pan_bg.css("background-image", morning);
            console.log("morning");
        }

        else if(hours >= 22){
            pan_bg.css("background-image", nigth_clear);
            console.log("nigth_clear");
        }
        else if(cloudsServ > 50){
            pan_bg.css("background-image", evening_cloud_middle);
            console.log("cloudy");
        }
        else{
            pan_bg.css("background-image", day);
        }
    }
    function checkMoon(data){
        let hours = new Date().getHours();

        let cloud_reg = "url('../img/big_cloud.svg')"; 
        let cloud_reg1 = "url('../img/just_cloud.svg')"

        let cloud = "url('./img/just_cloud.svg')";
        let bigCloud = "url('./img/big_cloud.svg')"; 

        let back_moon = $('#moonBig');
        let moon_cloud_black = $('#moon_cloud_black');
        let half_moon = $('#half_moon');
        if(hours >= 22){
            back_moon.css({
                "display": "block"
            });
            half_moon.css({
                "display": "block"
            });
            moon_cloud_black.css({
                "display": "block"
            });
            console.log('checkMoon_1');
            checkViewBack(data);
        }
        else{
            checkViewBack(data);
            console.log('checkMoon_2');
        }
    }
});