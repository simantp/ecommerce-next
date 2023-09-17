import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      {/* Gradient Overlay */}
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={4000}
      >
        <div>
          <Image
            loading="lazy"
            src="/images/banner1.png"
            width={1200}
            height={128}
            alt="banner1"
          />
        </div>
        <div>
          <Image
            loading="lazy"
            src="/images/banner2.png"
            width={1200}
            height={128}
            alt="banner2"
          />
        </div>
        <div>
          <Image
            loading="lazy"
            src="/images/banner3.png"
            width={1200}
            height={128}
            alt="banner3"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
