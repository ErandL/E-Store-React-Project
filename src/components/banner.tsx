import "../index.css"
import ShopNowBtn from "./shopNowBtn"

export default function Banner() {
  return (
    <div className="hero-banner d-flex flex-column flex-lg-row justify-content-center align-items-center gap-5 ">
      <div className="hero-banner-desc d-flex flex-column align-items-center align-items-lg-start">
        <p className="text-secondary">Pro.Beyond.</p>
        <h1 className="text-white fw-lighter text-center text-lg-start">IPhone 14 <span className="fw-bolder"><b>Pro</b></span></h1>
        <span className="text-secondary text-center text-lg-start">Created to change everything for the better. For everyone</span>
        <ShopNowBtn text="Shop Now" className="text-white w-fit border-secondary-subtle py-3" />
      </div>
      <img src="https://i.ibb.co/ksxnFtvD/Iphone-Image.png" alt="Iphone-Image" />
    </div>
  )
}
