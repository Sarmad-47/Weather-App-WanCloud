import { useState, useEffect } from 'react';
import axios from 'axios';
import { SunOutlined, CloudFilled, LoadingOutlined } from '@ant-design/icons';
import { IoMdRainy, IoMdSnow, IoMdThunderstorm } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill } from 'react-icons/bs';
import WeatherCard from '../components/Weather/WeatherCard';
import { useStateContext } from '../contexts/ContextProvider';

const APIkey = '561886ba5d92ea5e1d302526d3fb9b6c';

const ShowWeather = () => {
  const {backgroundColor} = useStateContext();
  const [weatherData, setWeatherData] = useState([]);
  const locations = ['Islamabad', 'Lahore', 'Karachi', 'Peshawar'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = locations.map(location =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`)
        );

        const results = await Promise.all(promises);
        const data = results.map(res => res.data);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full min-h-screen flex flex-row items-center justify-center px-6 lg:px-0' style={{ backgroundColor: backgroundColor}} >
      <div className='flex flex-wrap justify-center gap-4 mt-4'>
        {weatherData.length === 0 ? (
          <div className='w-full h-screen flex flex-col justify-center items-center'>
            <LoadingOutlined className='text-5xl' />
          </div>
        ) : (
          weatherData.map((data, index) => (
            <WeatherCard key={index} data={data} icon={getWeatherIcon(data.weather[0].main)} />
          ))
        )}
      </div>
    </div>
  );
};

// Function to determine the appropriate weather icon based on weather condition
const getWeatherIcon = (weatherCondition) => {
  switch (weatherCondition) {
    case 'Clouds':
      return <CloudFilled />;
    case 'Haze':
      return <BsCloudHaze2Fill />;
    case 'Rain':
      return <IoMdRainy className='text-[#31cafb]' />;
    case 'Clear':
      return <SunOutlined className='text-[#ffde33]' />;
    case 'Drizzle':
      return <BsCloudDrizzleFill className='text-[#31cafb]' />;
    case 'Snow':
      return <IoMdSnow className='text-[#31cafb]' />;
    case 'Thunderstorm':
      return <IoMdThunderstorm />;
    default:
      return null;
  }
};

export default ShowWeather;
