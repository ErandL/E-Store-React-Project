import "../index.css"
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function BrowseByCategory() {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-container d-flex flex-column gap-4">
      <div className="d-flex justify-content-between">
        <h3>Browse By Category</h3>
        <div className="d-flex gap-3">
          <i className="fa-solid fa-chevron-left fs-3" onClick={scrollLeft} style={{ cursor: 'pointer' }}></i>
          <i className="fa-solid fa-chevron-right fs-3" onClick={scrollRight} style={{ cursor: 'pointer' }}></i>
        </div>
      </div>
      <div ref={scrollRef} className="d-flex justify-content-between gap-4 overflow-auto" style={{
        scrollBehavior: 'smooth',
        scrollSnapType: 'x mandatory'
      }}>
        <Link to={`/products?category=phones`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}>
            <img src="https://i.ibb.co/FbmpQF1L/Phones.png" alt="Phones" />
            <span>Phones</span>
          </div>
        </Link>
        <Link to={`/products?category=Smart Watches`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}>
            <img src="https://i.ibb.co/PZgnRY9t/Smart-Watches.png" alt="Smart-Watches" />
            <span>Smart Watches</span>
          </div>
        </Link>
        <Link to={`/products?category=Cameras`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}>
            <img src="https://i.ibb.co/JWJ6BPsR/Cameras.png" alt="Cameras" />
            <span>Cameras</span>
          </div>
        </Link>
        <Link to={`/products?category=Headphones`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}>
            <img src="https://i.ibb.co/ZpcBPGVb/Headphones.png" alt="Headphones" />
            <span>Headphones</span>
          </div>
        </Link>
        <Link to={`/products?category=Computers`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}>
            <img src="https://i.ibb.co/gZHg9q4R/Computers.png" alt="Computers" />
            <span>Computers</span>
          </div>
        </Link>
        <Link to={`/products?category=Tablets`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center" style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}>
            <img src="https://i.ibb.co/d48PZLdd/Gaming.png" alt="Gaming" />
            <span>Gaming</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
