
$(document).ready(function () {
    $.getJSON('./data/current.city.list.json', function (data) {
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
        
        $('select').on('change', function () {
            forcastByFiveDays();
        })
    })

});