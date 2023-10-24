import icons from "./icons";

const {
  MdOutlineLibraryMusic,
  AiOutlineProfile,
  LiaChartPieSolid,
  PiRadioButton,
  PiRadioLight,
} = icons;
export const sidebarMenu = [
  {
    path: "",
    text: "Khám Phá",
    icon: <PiRadioButton size={24} />,
    end: true,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <LiaChartPieSolid size={24} />,
  },

  {
    path: "radio",
    text: "Radio",
    icon: <PiRadioLight size={24} />,
  },
  {
    path: "mymusic",
    text: "Thư Viện",
    icon: <MdOutlineLibraryMusic size={24} />,
  },
];
