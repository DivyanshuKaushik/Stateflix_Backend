import {BsSun} from 'react-icons/bs'
const WeatherCard = () => {
  return (
    <div className="w-72 p-2 shadow-md rounded-md">
        <div className="border-b">  
            <span className="">Chennai,Tamil Nadu</span>
        </div>
        <div className="flex justify-between mt-3">
            <div className="flex flex-col">
                <span className="">Sunny</span>
                <span className="text-3xl text-secondary font-semibold">31 C</span>
            </div>
            <BsSun className='text-5xl text-yellow-400' />
        </div>
        <div className="">

        </div>
    </div>
  )
}

export default WeatherCard