import Input from '../components/input'
import '../index.css'
import SideMenu from '../components/sideMenu'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className='d-flex gap-5 justify-content-between justify-content-xl-center align-items-center p-4'>
      <div className='p-0 m-0 d-flex gap-5 align-items-center'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><h2 style={{ cursor: 'pointer' }}>E-Store</h2></Link>
        <Input className="d-none d-lg-inline"></Input>
      </div>
      <ul className='d-none d-xl-flex'>
        <Link to="/" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>Home</li></Link>
        <Link to="/catalog" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>Catalog</li></Link>
        <Link to="/about-us" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>About</li></Link>
        <Link to="/contact-us" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>Contact Us</li></Link>
      </ul>
      <div className='d-none d-xl-flex gap-3 justify-content-center align-items-center fs-5 cart'>
        <i className="fa-regular fa-heart"></i>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}><i className="fa-solid fa-cart-shopping"></i></Link>
        <i className="fa-regular fa-user"></i>
      </div>
      <SideMenu></SideMenu>
    </nav>
  )
}
