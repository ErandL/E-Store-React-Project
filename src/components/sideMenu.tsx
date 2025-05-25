import { useState } from 'react';
import { Drawer, Button } from '@mui/material';
import Input from './input';
import "../assets/sideMenu.css"
import { Link } from 'react-router-dom';

const SideMenu = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    };

    return (
        <>
            <Button color="inherit" onClick={toggleDrawer(true)}><i className="fa-solid fa-bars fs-2 d-sm-inline d-xl-none"></i></Button>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} slotProps={{
                paper: {
                    sx: {
                        width: "100%",
                        height: "fit-content",
                    },
                },
            }}>
                {
                    <div className='d-flex flex-column gap-3 mobile-menu'>
                        <ul className='d-flex flex-column p-0 m-0 gap-3'>
                            <Link to="/" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>Home</li></Link>
                            <Link to="/catalog" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>Catalog</li></Link>
                            <Link to="/#" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>About</li></Link>
                            <Link to="/#" style={{ textDecoration: 'none' }}><li className='text-black fs-5'>Contact Us</li></Link>
                        </ul>
                        <Input className="d-inline"></Input>
                        <div className='d-flex gap-4 justify-content-start align-items-center mt-3 fs-5 cart'>
                            <i className="fa-regular fa-heart"></i>
                            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}><i className="fa-solid fa-cart-shopping"></i></Link>                            <i className="fa-regular fa-user"></i>
                        </div>
                    </div>
                }
            </Drawer>
        </>
    );
};

export default SideMenu;
