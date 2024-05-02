import  { useState, useEffect } from 'react';
import axios from 'axios';
import { SunOutlined, SearchOutlined, CloudFilled, EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Card, Input, Button } from "antd";
import { IoMdRainy, IoMdSnow, IoMdThunderstorm } from 'react-icons/io';
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsWater, BsThermometer, BsWind } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb';
import { useStateContext } from '../contexts/ContextProvider';
const APIkey = '561886ba5d92ea5e1d302526d3fb9b6c';

const SearchWeather = () => {
  const {backgroundColor} = useStateContext();
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Islamabad');
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue !== '') {
      setLocation(inputValue);

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;
        const response = await axios.get(url);

        if (response.ok) {
          setData(response.data);

          setInputValue('');
        } else {

          console.error('Error fetching weather data:', response.statusText);
        }
      } catch (error) {

        console.error('Error fetching weather data:', error);
      }
    }
  };


  //fetching the data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;
    axios.get(url).then(res => {
      setData(res.data);
    })
  }, [location]);



  if (!data) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div>
          <LoadingOutlined className='text-5xl' />
        </div>
      </div>
    )
  }

  // set the icon according to weather 
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <CloudFilled />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />;
      break;
    case 'Clear':
      icon = <SunOutlined className='text-[#ffde33]' />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />;
      break;
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]' />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }
  //date object
  const date = new Date();
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center px-6 lg:px-0' style={{ backgroundColor: backgroundColor  }} >

      <Form className='h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-6 bg-no-repeat mt-4'>
        <div className='h-full relative flex items-center justify-between p-2'>
          <Input
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[18px] font-light pl-6 border-none focus:bg-transparent hover:bg-transparent'
            type="text"
            placeholder='Search by city or country'
          />

          <Button onClick={(e) => handleSubmit(e)} className='bg-[#1ab8ed] hover:bg-[#15abdd] rounded-full flex justify-center items-center transition'>
            <SearchOutlined className='text-2xl text-white' />
          </Button>
        </div>
      </Form>
      <Card className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-6 mb-4'>
        <div>
          {/**Card top */}
          <div className='flex items-center gap-x-5'>
            {/**Icon */}
            <div className='text-[87px]'>{icon}</div>
            <div>
              {/**Country Name */}
              <div className='text-2xl font-semibold'>{data.name},{data.sys.country}</div>
              {/**date */}
              <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
            </div>

          </div>
          {/**Card body */}
          <div className='my-20'>
            <div className='flex justify-center items-center'>
              {/**Temperature */}
              <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
              {/**Celsius */}
              <div className='text-4xl'><TbTemperatureCelsius /></div>
            </div>
            {/**Weather Description */}
            <div className='capitalize text-center'>{data.weather[0].description}</div>
          </div>
          {/**Card Bottom */}
          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'><EyeOutlined /></div>
                <div>
                  Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'><BsThermometer /></div>
                <div className='flex'>
                  Feels like
                  <div className='flex ml-2'>
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius/>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'><BsWater /></div>
                <div>
                  Humidity <span className='ml-2'>{data.main.humidity} %</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'><BsWind /></div>
                <div className='flex'>
                 Wind <span className='ml-2'> {data.wind.speed}  m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}


export default SearchWeather;