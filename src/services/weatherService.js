import axios from 'axios';

const API_KEY = '5445ff8dc6dc7f72349851480bea25e5';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function getWeatherByCity(city) {
    return axios.get(`${BASE_URL}/weather`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'pt_br',
        },
    });
}

export function getForecastByCity(city) {
    return axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'pt_br',
        }
    })
}
