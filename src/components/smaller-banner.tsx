import { useEffect, useState } from "react";
import "../index.css";
import ShopNowBtn from "./shopNowBtn";

export default function SmallerBanner() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="smaller-banner-container">
      <div className="row d-flex flex-column flex-lg-row">
        <div className="col first-block d-flex flex-column m-0 p-0">
          <div className="first-row d-flex flex-column flex-lg-row justify-content-center align-items-center">
            <img
              src={isMobile
                ? "https://i.ibb.co/2098MDX4/Play-Station-1.png"
                : "https://i.ibb.co/pBxFnYVF/Play-Station.png"}
              alt="Play-Station" />
            <div className="p-3 text-center text-lg-start">
              <p className="fs-1 fw-bold">Playstation 5</p>
              <span>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</span>
            </div>
          </div>

          <div className="second-row d-flex flex-column flex-lg-row">
            <div className="first-col d-flex flex-column flex-lg-row justify-content-center align-items-center">
              <img
                src={isMobile
                  ? "https://i.ibb.co/0ymfhkMS/hero-gnfk5g59t0qe-xlarge-2x-1-1.png"
                  : "https://i.ibb.co/5XDMjHg5/hero-gnfk5g59t0qe-xlarge-2x-1.png"}
                alt="Apple AirPods Max" />
              <div className="p-3 text-center text-lg-start">
                <p className="fs-1 lh-sm">Apple AirPods <b>Max</b></p>
                <span>Computational audio. Listen, it's powerful</span>
              </div>
            </div>

            <div className="second-col d-flex flex-column flex-lg-row justify-content-center align-items-center">
              <img
                src={isMobile
                  ? "https://i.ibb.co/R46bJ1zQ/image-36-1.png"
                  : "https://i.ibb.co/My11VShz/image-36.png"}
                alt="Apple Vision Pro" />
              <div className="p-3 text-white text-center text-lg-start">
                <p className="fs-1 lh-sm">Apple Vision <b>Pro</b></p>
                <span>An immersive way to experience entertainment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col d-flex flex-column flex-lg-row justify-content-center align-items-center second-block">
          <div className="d-flex flex-column p-5 text-center text-lg-start justify-content-center align-items-center justify-content-lg-start align-items-lg-start">
            <p>Macbook <b>Air</b></p>
            <span>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</span>
            <ShopNowBtn text="Shop Now" className="text-black border-black w-fit py-3" />
          </div>
          <img
            src={isMobile
              ? "https://i.ibb.co/MyXkzYkg/Mac-Book-Pro-14-1.png"
              : "https://i.ibb.co/rfwGVLK2/Mac-Book-Pro-14.png"}
            alt="Mac-Book-Pro-14" />
        </div>
      </div>
    </div>
  );
}