import { shallowMount } from '@vue/test-utils';
import WeatherComponent from '@/views/WeatherComponent.vue';
import { getWeatherByCity, getForecastByCity } from '@/services/weatherService';

jest.mock('@/services/weatherService', () => ({
    getWeatherByCity: jest.fn(),
    getForecastByCity: jest.fn(),
}));

describe('WeatherComponent.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(WeatherComponent);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve mostrar um alerta se a cidade estiver vazia', async () => {
        window.alert = jest.fn();

        wrapper.setData({ city: '' });


        await wrapper.vm.fetchWeather();


        expect(window.alert).toHaveBeenCalledWith('Por favor, digite o nome de uma cidade.');
    });

    it('deve buscar e definir weather e forecast corretamente', async () => {

        const weatherResponse = { data: { name: 'São Paulo', main: { temp: 25 }, weather: [{ description: 'clear sky' }] } };
        const forecastResponse = { data: { list: new Array(40).fill({ main: { temp: 25 }, weather: [{ description: 'clear sky' }] }) } };


        getWeatherByCity.mockResolvedValue(weatherResponse);
        getForecastByCity.mockResolvedValue(forecastResponse);

        wrapper.setData({ city: 'São Paulo' });


        await wrapper.vm.fetchWeather();


        expect(wrapper.vm.weather).toEqual(weatherResponse.data);
        expect(wrapper.vm.forecast.length).toBe(4); // Verifica o filtro de previsões (1 a cada 10)
    });

    it('deve lidar com erros de API', async () => {

        const error = new Error('Erro na API');
        getWeatherByCity.mockRejectedValue(error);

        console.error = jest.fn();

        wrapper.setData({ city: 'São Paulo' });


        await wrapper.vm.fetchWeather();


        expect(console.error).toHaveBeenCalledWith(error);


        expect(window.alert).toHaveBeenCalledWith('Cidade não encontrada ou erro na requisição.');
    });
});
