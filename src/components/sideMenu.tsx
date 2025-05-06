import { useState } from 'react';
import { Drawer, Button } from '@mui/material';
import Input from './input';
import "../assets/sideMenu.css"

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
                            <li className='active-nav-li'><a href="#" className='text-decoration-none text-black fs-5'>Home</a></li>
                            <li><a href="#" className='text-decoration-none text-black fs-5'>About</a></li>
                            <li><a href="#" className='text-decoration-none text-black fs-5'>Contact Us</a></li>
                            <li><a href="#" className='text-decoration-none text-black fs-5'>Blog</a></li>
                        </ul>
                        <div className='d-none d-xl-flex gap-3 justify-content-center align-items-center fs-5 cart'>
                            <i className="fa-regular fa-heart"></i>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <i className="fa-regular fa-user"></i>
                        </div>
                        <Input className="d-inline"></Input>
                    </div>
                }
            </Drawer>
        </>
    );
};

export default SideMenu;
