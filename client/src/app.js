const app = Vue.createApp({
    data() {
        return {
            loading: true,
            weather: undefined,
        };
    },
});

const vm = app.mount('body');

async function getWeather() {
    const weatherResponse = await fetch('/api/weather');

    vm.$data.weather = await weatherResponse.json();
    vm.$data.loading = false;
}

getWeather();