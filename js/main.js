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
                        "http://api.openweathermap.org/data/2.5/weather",
                        {
                            "id": $('select option:selected').attr('data-city'), //ідинтифікатор міста Лева
                            "appid": "47fb3882d09a3eb3c5a020c7c8f3e57a"
                        },
                        function (data) {
                            let checkIcon = foo(data);
                            let outTime = checkDate();
                            let out = '';
                            console.log(data);
                            out += `<div class="wether-wrap">`
                            out += `<p class="data">${outTime}</p>`
                            // out += `<dic class="ico-wether"><i class="wi ${checkIcon}"></i></div>`;
                            out += `<dic class="ico-wether"><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>`;
                            out += `<p class="temp">Температура: <b>${Math.round(data.main.temp - 273)}<i class="wi wi-celsius"></i></b></p>`;
                            out += `<p class="humidity">Вологість повітря: <b>${data.main.humidity}%</b></p>`;
                            out += `<p class="pressure">Тиск, мм.рт.ст: <b>${Math.round(data.main.pressure * 0.00750003755419211 * 100)}</b></p>`;
                            out += `<p class="wind">Швидкість вітру, м/с: <b>${data.wind.speed}</b></p>`;
                            out += `<p class="wind"></p>`
                            out += `</div>`
                            $('#root').html(out);

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
                             $('.location_text').html(`${Math.round(data.main.temp - 273)}&#176 ${data.name}, Україна`)
                        }
                    );
                }
            }
        }
        currentCity();
        
        $('select').on('change', function () {
            currentCity();
        })
        function forcastByFiveDays(){
            let out = '';
            for (let key in data) {
                if (data[key].id == $('select option:selected').attr('data-city')) {

                    $.get(
                        "http://api.openweathermap.org/data/2.5/forecast?",
                        {
                            "id": $('select option:selected').attr('data-city'),
                            "appid": "47fb3882d09a3eb3c5a020c7c8f3e57a"
                        },
                        function (data) {
                            console.log(data);
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
        // let day = new Date().getDate();
        // let mounth = new Date().getMonth();
        outTime=`станом на ${hours}:${minutes} GMT+0200`
        return outTime;
    }



});