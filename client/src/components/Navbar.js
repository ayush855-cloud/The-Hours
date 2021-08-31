import React,{useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {
 LOGOUT
} from '../store/types/UserTypes';
import Confetti from 'react-confetti';


function Navbar() {
    const confettiRef=useRef(null);

    const [open,setOpen]=useState(false);
    // const [close,setClose]=useState(false);
    const { user } = useSelector((state) => state.AuthReducer);
    const dispatch=useDispatch();
    const logout=()=>{
        localStorage.removeItem("myToken");
        dispatch({
            type:LOGOUT
        });
    }


    const Links = user ? <div className={`navbar__details ${open && 'active'}`}>
        <li onClick={()=>{ setOpen(!open)}}>
            <Link to="/create" className="link">
                Create Post
            </Link>
        </li>
        <li onClick={()=>{ setOpen(!open)}}>
            <Link to="/dashboard" className="link">
                {user.name}
            </Link>
        </li>
        <li onClick={()=>{ setOpen(!open)}}>
            <span onClick={logout} className="link">
                Logout
            </span>
        </li>
    </div> : <div className={`navbar__details ${open && 'active'}`}>
        <li>
            <Link to="/register" className="link" onClick={()=>{ setOpen(!open)}}>
                Register
            </Link>
        </li>
        <li>
            <Link to="/login" className="link" onClick={()=>{ setOpen(!open)}}>
                Login
            </Link>
        </li>
    </div>
    // ref={confettiRef}
    return (
        <nav>
            <div className={`navbar ${open && 'active'}`} ref={confettiRef} >
            <Confetti 
                height={90}
                className={`confetti ${open && 'increase'}`}
            />
                <div className={`navbar__left ${open && 'active'}`}>
                    <Link  to="/">
                        <img src="/images/globe-removebg-preview.png" alt="logo" className="imag"/>
                    </Link>
                   {Links}

                </div>
                <div className={`navbar__right ${open && 'active'}`}>

                    <img alt="something" className="facebook" src="/images/white-facebook-icon-transparent-background-7-removebg-preview.png" />
                    <img alt="someth" className="twitter" src="/images/twitter.png" />
                    <img alt="somethin" className="instagram" src="/images/instagram-logo.png" />
                    <img alt="some" className="youtube" src="/images/youtube.png" />
                </div>
                {open ? (<CloseIcon onClick={()=>{ setOpen(!open)}} className="menu__icon"/>) : (<MenuIcon onClick={()=>{ setOpen(!open)}} className="menu__icon"/>)}
            </div>
        </nav>
    )
}

export default Navbar
