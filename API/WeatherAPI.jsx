import axios from 'axios';

const API_KEY = '3c9a77eef4994e80c471a248bbb3647f';

export const fetchWeather = async (city) => {
    if (!city.trim()) return null
    try {
        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        return data;
    } catch (error) {
     alert('Ensure that the city exsist')
     console.log(error)
     return null
    }
} 