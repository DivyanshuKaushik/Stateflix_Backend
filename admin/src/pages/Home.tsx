import NewsCard from "../components/cards/NewsCard"
import WeatherCard from "../components/cards/WeatherCard"
import Modal from "../components/utils/Modal"

const Home = () => {
  return (
    <div className="space-y-8">
      <Modal title="hello" btnName="open">
        <p className="text-xl text-primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora deleniti amet error in asperiores sapiente molestiae, dicta quidem nostrum voluptatum ea nam corporis molestias vitae, voluptate suscipit corrupti reiciendis provident?</p>
      </Modal>
      <div className="flex flex-wrap w-4/5 mx-auto gap-8 p-5">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <WeatherCard />
      </div>
    </div>
  )
}

export default Home