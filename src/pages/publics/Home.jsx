import { Slider, Section } from "../../components";

const Home = () => {
  return (
    <div className="w-full h-full overflow-y-auto px-[59px] bg-main-300">
      <div className="pt-8 ">
        <Slider></Slider>
        <Section></Section>
      </div>
    </div>
  );
};

export default Home;
