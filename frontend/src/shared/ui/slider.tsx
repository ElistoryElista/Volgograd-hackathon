import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TImage } from "../model/types";
import { ArrowRightIcon } from "../assets";

interface ISlider {
  images: TImage[];
  classNames?: string;
}

type TCustomArrow = {
  onClick?: () => void;
};

const CustomNextArrow: React.FC<TCustomArrow> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-[50%] -translate-y-[50%] cursor-pointer rounded-full bg-gray-200"
    >
      <ArrowRightIcon className="w-7 sm:w-10" />
    </button>
  );
};
const CustomPrevArrow: React.FC<TCustomArrow> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-[50%] z-20 -translate-y-[50%] cursor-pointer rounded-full bg-gray-200"
    >
      <ArrowRightIcon className="w-7 rotate-180 sm:w-10" />
    </button>
  );
};

export const Slider: React.FC<ISlider> = ({ images, classNames = "" }) => {
  const settings = {
    dots: false,
    arrows: images.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    fade: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <SlickSlider {...settings} className="relative h-full">
      {images.map(({ id: idImage, url }) => (
        <div key={idImage} className={"bg-base-200 " + classNames}>
          <img src={url} className="h-full w-full object-contain" />
        </div>
      ))}
    </SlickSlider>
  );
};
