import React, {useState, useEffect, useRef} from "react";
import '../header/Header.css';
import Logo from '../../assets/images/logo.svg';
import SearchIcon from '../../assets/images/search.svg';
import Select from "../selectDrop/select";
import axios from 'axios';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Wishlist from '../../assets/images/wishlist.svg';
import Cart from '../../assets/images/cart.svg';
import User from '../../assets/images/user.svg';
import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { ClickAwayListener } from '@mui/base';

import Nav from "./nav/nav";

export default function Header(){

    const [isOpenDropDown, setIsOpenDownDown] = useState(false);
    const headerRef = useRef();

    const [categories,setCategories] = useState([
        'Xi măng',
        'Sắt, Thép',
        'Cát, đá',
        'Gạch',
        'Cát',
        'Đá',
        'Phụ gia xây dựng',
        'Trần, sàn'
    ]);

    const countryList =[];

    useEffect(() => {
        getCountry('https://provinces.open-api.vn/api/')
    },[]);


    const getCountry = async(url)=>{
        try {
            await axios.get(url).then((res)=>{
                if(res!==null){
                    // console.log(res.data);
                    res.data.map((item)=>{
                        countryList.push(item.name)
                    })
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            let position = window.pageYOffset;
            if(position > 100){
                headerRef.current.classList.add('fixed')
            }else{
                headerRef.current.classList.remove('fixed')
            }
        })
    })

    return (    
        <>
        <div className="headerWrapper" ref={headerRef}>
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <img src={Logo} alt="logo" height="60px" img/>
                        </div>

                        <div className="col-sm-5">
                            <div className="headerSearch d-flex align-items-center ">                               
                                <Select data={categories} placeholder='All categories' icon={false}/>
                                <div className="search">
                                    <input type="text" placeholder="Search for items..." />
                                    <img className="searchIcon" src={SearchIcon} width="30px" alt="icon search" />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-5 d-flex justify-content-end">
                            <div className="ml-auto d-flex align-items-center">
                                <div className="countryWrapper">
                                    <Select data={countryList} placeholder='Your location' icon ={<LocationOnOutlinedIcon style={{opacity:'0.5'}}/>}/>
                                </div>
                                <ClickAwayListener onClickAway={() => setIsOpenDownDown(false)}>
                                    <ul className="list list-inline mb-2 headerTabs">
                                        <li className="list-inline-item">
                                            <span>
                                                <img src={Wishlist} alt="wishlist" />
                                                <span className="badge bg-info rounded-circle">3</span>  
                                                Wishlist
                                            </span>
                                        </li>
                                        <li className="list-inline-item">
                                            <span>
                                                <img src={Cart} alt="wishlist" />
                                                <span className="badge bg-info rounded-circle">3</span>  
                                                Wishlist
                                            </span>
                                        </li>
                                        <li className="list-inline-item">
                                            <span onClick={() => setIsOpenDownDown(isOpenDropDown => !isOpenDropDown)}>
                                                <img src={User} alt="wishlist" />
                                                    Account
                                            </span>
                                        {
                                            isOpenDropDown!== false &&
                                            <ul className="dropdownMenu">
                                                <li><Button><PersonOutlineOutlinedIcon/> My Account</Button></li>
                                                <li><Button><ManageSearchOutlinedIcon/> Order History</Button></li>
                                                <li><Button><FavoriteBorderOutlinedIcon/> My Wishlist</Button></li>
                                                <li><Button><LogoutOutlinedIcon/> Sign Out</Button></li>
                                            </ul>
                                        }
                                        </li>
                                    </ul>
                                </ClickAwayListener>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Nav/>
        </div>

        <div className="afterHeader">
            
        </div>
        </>
    );
}