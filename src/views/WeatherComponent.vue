<template>
  <div id="container-content">
    <div id="weather-header">
      <div id="weather-header-text">
        <img src="/sun-icon.png" alt="Icone do Header">
        <h1>ClimaTempo</h1>
      </div>

      <div id="weather-search">
        <input v-model="city" placeholder="Digite o nome da cidade" />
        <img src="/lupa%20sem%20fundo.png" @click="fetchWeather" alt="Icone de Pesquisa"/>
      </div>
    </div>

    <div id="weather-first-info-container" v-if="weather && weather.main && weather.wind && weather.weather.length">
        <div id="weather-basic-advanced-info">
          <WeatherInfo
              :cityName="weather.name"
              :temperature="weather.main.temp"
              :description="weather.weather[0].description"
          />
          <img id="weather-icon" src="/weather-icon.png" alt="Icone do Clima"/>
          <WeatherDetails
              :pressure="weather.main.pressure"
              :windSpeed="weather.wind.speed"
              :windDirection="weather.wind.deg"
              :iconUrl="`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`"
          />
        </div>
    </div>
    <div id="weather-forecast-info" v-if="weather">
      <p id="header-forecast">Clima nos promixos 4 dias:</p>
      <WeatherForecast  :forecast="forecast" />
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

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#container-content{
  background: #4a90e2;
}

#weather-header {
  width: 100%;
  background-color: #05347e;
  height: 3.5rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

#weather-header-text {
  display: flex;
  align-items: center;
}

#weather-header-text img {
  height: 5rem;
  margin-right: 0.5rem;

}

#weather-header-text h1 {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

#weather-search {
  display: flex;
  align-items: center;
}

#weather-search input {
  height: 2.6rem;
  border-radius: 24px;
  margin-right: 0.5rem;
  outline: none;
  padding: 0.5rem 0.8rem;
  border: none;
}

#weather-search img {
  height: 2rem;
  cursor: pointer;
}

#weather-first-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #4a90e2;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  height: 22rem;
}

#weather-basic-advanced-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: #4a90e2;
  padding: 20px;
  border-radius: 12px;
}

#weather-icon {
  width: 32rem;
  height: 20rem;
  margin-right: 20px;
}
#header-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #ffffff;
  width: 20rem;
  border-radius: 34px;
  height: 4rem;
  padding: 10px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}



</style>
