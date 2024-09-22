<template>
  <div id="container-content"> <!-- Elemento contêiner principal -->
    <div id="weather-header">
      <div id="weather-header-text">
        <img src="/sun-icon.png" alt="Icone do Header" />
        <h1 id="header-h1">ClimaTempo</h1>
      </div>

      <div id="weather-search">
        <input id="input-search" v-model="city" placeholder="Digite o nome da cidade" />
        <img src="/lupa%20sem%20fundo.png" @click="fetchWeather" alt="Icone de Pesquisa" />
      </div>
    </div>

    <div id="weather-component">
      <div id="container-first-info" v-if="weather">
        <div id="weather-main-info">
          <img id="weather-icon" src="/weather-icon.png" alt="Icone do Main" />
          <WeatherInfo
              :cityName="weather.name"
              :temperature="weather.main.temp"
              :description="weather.weather[0].description"
          />
          <WeatherDetails
              v-if="weather.wind"
              :pressure="weather.main.pressure"
              :windSpeed="weather.wind.speed"
              :windDirection="weather.wind.deg"
              :iconUrl="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`"
          />
        </div>
        <div id="forecast-info">
          <h3>Previsão para os próximos 4 dias: </h3>
        </div>
        <div id="container-forecast">
          <WeatherForecast :forecast="forecast" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getForecastByCity, getWeatherByCity } from '@/services/weatherService';
import WeatherInfo from '@/views/WeatherInfoComponent.vue';
import WeatherDetails from '@/views/WeatherDetailsComponent.vue';
import WeatherForecast from '@/views/WeatherForecastComponent.vue';

export default {
  name: 'WeatherComponent',
  components: {
    WeatherInfo,
    WeatherDetails,
    WeatherForecast
  },
  data() {
    return {
      city: '',
      weather: null,
      forecast: []
    };
  },
  methods: {
    async fetchWeather() {
      if (this.city.trim() === '') {
        alert('Por favor, digite o nome de uma cidade.');
        return;
      }
      try {
        const response = await getWeatherByCity(this.city);
        this.weather = response.data;

        const forecastResponse = await getForecastByCity(this.city);
        this.forecast = forecastResponse.data.list.filter((item, index) => index % 10 === 0);
      } catch (error) {
        console.error(error);
        alert('Cidade não encontrada ou erro na requisição.');
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#container-content {
  width: 100%;
  height: 100vh;
  background-color: #4a90e2;
}

#weather-component {
  text-align: center;
}

#container-first-info {
  background-color: #ccf2ff;
  width: 100%;
}

#weather-main-info {
  background-color: #4a90e2;
  height: 18rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 15px;
}

#weather-header {
  background-color: #05347e;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-height: 6rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  margin: 0 5px;
  width: calc(100% - 10px);
}

#header-h1 {
  margin-top: 15px;
}

#weather-header-text {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  height: 5rem;
}

#weather-header-text img {
  width: 10rem;
  height: 5rem;
}

#weather-search {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 20rem;
  height: 3rem;
  margin-top: 1rem;
}

#input-search {
  border-radius: 24px;
  width: 14rem;
  border: none;
  padding: 1.1rem;
  margin-right: 0.7rem;
  font-size: 0.9rem;
  outline: none;
}

#weather-component input {
  padding: 8px;
  width: 200px;
}

#weather-component button {
  padding: 8px 16px;
  margin-left: 8px;
}

#weather-icon {
  margin-bottom: 15rem !important;
  margin-right: 3rem;
  height: 15rem;
}

#forecast-info {
  width: 50%;
  height: 4rem;
  margin-left: 3rem;
  border-radius: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 1rem;
  background-color: white;
  font-weight: bold;
}

#container-first-info {
  background-color: #4a90e2;
}
</style>
