const app = Vue.createApp({
    data() {
        return {
            loading: true,
            weather: undefined,
        };
    },
    computed: {
        location() {
            return this.weather.Location.ParentCity ? this.weather.Location.ParentCity.LocalizedName : this.weather.Location.AdministrativeArea.LocalizedName;
        },
        currentTemperature() {
            return {
                value: this.weather.CurrentConditions.Temperature.Imperial.Value,
                unit: this.weather.CurrentConditions.Temperature.Imperial.Unit,
                description: this.weather.CurrentConditions.WeatherText,
            };
        },
        weatherIllustrationName() {
            const weatherIcon = this.weather.CurrentConditions.WeatherIcon;

            if (this.weather.CurrentConditions.IsDayTime) {
                if (weatherIcon < 3) {
                    return 'sunny';
                } else if (weatherIcon < 6) {
                    return 'partly-cloudy';
                } else if (weatherIcon < 9) {
                    return 'cloudy';
                } else if (weatherIcon === 11) {
                    return 'fog';
                } else if (weatherIcon < 19) {
                    return 'raining';
                } else if (weatherIcon === 41 || weatherIcon === 42) {
                    return 'thunderstorms';
                }
            } else {
                // TODO: night
            }
        },
    },
});

const vm = app.mount('body');

async function getWeather() {
    const weatherResponse = await fetch('/api/weather');

    vm.$data.weather = await weatherResponse.json();
    vm.$data.loading = false;
}

getWeather();