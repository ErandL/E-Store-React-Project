import "../assets/footer.css"
import ShopNowBtn from "./shopNowBtn"

export default function BannerLast() {
    return (
        <div className='last-banner d-flex flex-column justify-content-center align-items-center'>
            <div className='last-banner-text'>
                <span className="fs-1 fw-light">Big Summer <span className="fs-1 fw-bold">Sale</span></span>
                <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
                <ShopNowBtn text="Shop Now" className="text-white w-fit border-secondary-subtle py-3" />
            </div>
        </div>
    )
}
