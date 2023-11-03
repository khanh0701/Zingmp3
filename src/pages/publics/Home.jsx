import { Slider, Section } from "../../components";
import { useSelector } from "react-redux";
const Home = () => {
  const { chill, loveLife, remix, mood, artist } = useSelector(
    (state) => state.app
  );
  return (
    <div className="w-full h-full overflow-y-auto px-[59px] bg-main-300">
      <div className="pt-8 ">
        <Slider></Slider>
        <Section data={chill}></Section>
        <Section data={loveLife}></Section>
        <Section data={remix}></Section>
        <Section data={mood}></Section>
        <Section data={artist}></Section>
        <div className="w-full h-[500px]"></div>
      </div>
    </div>
  );
};

export default Home;
