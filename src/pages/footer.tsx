import "../assets/footer.css"

export default function Footer() {
    return (
        <div className="container-fluid footer-container bg-black text-white">
            <div className="d-flex flex-column">
                <p style={{ cursor: 'pointer' }} className="fs-2 fw-bold">E-Store</p>
                <p className="flex-grow-1 fw-lighter">We are a residential interior design firm located in Portland. Our boutique-studio offers more than the average store ! <br /> Welcome   </p>
                <div className="icons-holder">
                    <i style={{ cursor: 'pointer' }} className="fa-brands fa-x-twitter fs-5"></i>
                    <i style={{ cursor: 'pointer' }} className="fa-brands fa-facebook-f fs-5"></i>
                    <i style={{ cursor: 'pointer' }} className="fa-brands fa-tiktok fs-5"></i>
                    <i style={{ cursor: 'pointer' }} className="fa-brands fa-instagram fs-5" ></i>
                </div>
            </div>
            <div className="d-flex flex-column">
                <ul className="m-0 p-0">
                    <li className="fs-5 fw-bold">Services</li>
                    <li><a className="text-decoration-none text-white fw-lighter">Bonus program</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Gift cards</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Credit and paymant</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Service contracts</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Non-cash account</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Payment</a></li>
                </ul>
            </div>
            <div className="d-flex flex-column">
                <ul className="m-0 p-0">
                    <li className="fs-5 fw-bold">Assistance to the buyer</li>
                    <li><a className="text-decoration-none text-white fw-lighter">Find an order</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Terms of delivery</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Exchange and return of goods</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Guarantee</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Frequently asked questions</a></li>
                    <li><a className="text-decoration-none text-white fw-lighter">Terms of use of the site</a></li>
                </ul>
            </div>
        </div>
    )
}
