import { Card } from "antd";
import { EyeOutlined} from '@ant-design/icons';
import { BsWater, BsThermometer, BsWind } from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb';
const WeatherCard = ({ data, icon }) => {
    const date = new Date();
  return (
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
  );
};

export default WeatherCard;
